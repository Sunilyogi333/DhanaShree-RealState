import { AppDataSource } from '../../config/database.config'
import { EnvironmentConfiguration } from '../../config/env.config'
import { Booking } from '../../entities/booking/booking.entity'
import { User } from '../../entities/user/user.entity'
import { Property } from '../../entities/property/property.entity'
import { CreateBookingDTO } from '../../dto/booking.dto'
import HttpException from '../../utils/HttpException'
import webTokenService from '../../utils/webToken.service'
import EmailService from '../email/email.service'
import { generateHtml } from '../../utils/mail.template'
import { isToday } from '../../utils/date.utils'
import { BookingStatus } from '../../constants/enum/booking'
import { UpdateBookingDTO } from '../../dto/booking.dto'
import { getPagination, getPagingData } from '../../utils/pagination'
import { Message } from '../../constants/message'

class BookingService {
  constructor(
    private readonly bookingRepo = AppDataSource.getRepository(Booking),
    private readonly userRepo = AppDataSource.getRepository(User),
    private readonly propertyRepo = AppDataSource.getRepository(Property),
    private readonly mailService = new EmailService()
  ) {}

  async create(data: CreateBookingDTO) {
    const { fullName, email, phone, propertyId, date, message } = data

    const property = await this.propertyRepo.findOne({ where: { id: propertyId } })
    if (!property) throw HttpException.notFound(Message.notFound)

    return await AppDataSource.transaction(async (manager) => {
      const userRepo = manager.getRepository(User)
      const bookingRepo = manager.getRepository(Booking)

      // ✅ Find or create user
      let user = await userRepo.findOne({ where: { email } })

      let userEmail = email.toLowerCase()
      if (!user) {
        user = userRepo.create({ fullName, email: userEmail, phone })
        await userRepo.save(user)
      }

      // ✅ Get most recent booking for this user & property
      const existingBooking = await bookingRepo
        .createQueryBuilder('booking')
        .leftJoinAndSelect('booking.user', 'user')
        .leftJoinAndSelect('booking.property', 'property')
        .where('user.id = :userId', { userId: user.id })
        .andWhere('property.id = :propertyId', { propertyId })
        .orderBy('booking.createdAt', 'DESC')
        .getOne()

      // ✅ If latest booking is already verified and not cancelled, block
      if (existingBooking && existingBooking.status !== BookingStatus.cancelled && existingBooking.isVerified) {
        throw HttpException.badRequest(Message.bookingAlreadyVerified)
      }

      // ✅ Reuse or create new booking
      let booking = existingBooking

      if (!booking || booking.status === BookingStatus.cancelled) {
        booking = bookingRepo.create({
          user,
          property,
          date,
          message,
          isVerified: false,
          status: BookingStatus.pending,
          emailSentCount: 0,
        })
      }

      // ✅ Rate limiting for email
      if (isToday(booking.lastEmailSentAt) && booking.emailSentCount >= 100) {
        throw HttpException.tooManyRequests(Message.bookingEmailLimitReached)
      }

      booking.lastEmailSentAt = new Date()
      booking.emailSentCount += 1
      await bookingRepo.save(booking)

      // ✅ Generate token and email
      const token = webTokenService.generateBookingToken({ bookingId: booking.id, email })
      const verifyUrl = `${EnvironmentConfiguration.FRONTEND_URL_LOCAL}/verify-booking?token=${token}`

      const mailOptions = {
        from: EnvironmentConfiguration.MAIL_FROM,
        text: 'Booking verification',
        to: email,
        html: generateHtml(
          user.fullName,
          new Date().toLocaleString(),
          `<p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
          <p style="line-height: 2vh; text-align: center;">
          Thank you for booking a property with us. To confirm your booking, please click the button below:
          </p>
          <p style="text-align: center;">
          <a href="${verifyUrl}" style="cursor: pointer; text-decoration: none; padding: 10px 20px; background-color: #4CAF50; color: white; border-radius: 5px;">
          Verify Booking
          </a>
          </p>
          <p style="text-align: center;">
          This link will expire in 24 hours for security reasons.
          </p>
          
          <b>Note:</b>
          <p style="font-size: 14px;">
          If you did not make this booking, you can safely ignore this email.
          </p>
          </p>`
        ),
        subject: 'Verify Your Booking',
      }

      try {
        await this.mailService.sendMail(mailOptions)
      } catch (error) {
        throw HttpException.internalServerError(Message.server)
      }

      return { success: true, message: 'Booking verification email sent' }
    })
  }

  async verifyBooking(token: string) {
    const payload = webTokenService.verifyBookingToken(token)

    const booking = await this.bookingRepo.findOne({
      where: { id: payload.bookingId },
      relations: ['user'],
    })

    if (!booking || booking.user.email !== payload.email) {
      throw HttpException.unauthorized(Message.unAuthorized)
    }

    if (booking.isVerified) {
      return { success: true, message: 'Already verified' }
    }

    booking.isVerified = true
    await this.bookingRepo.save(booking)

    return { success: true, message: 'Booking verified successfully' }
  }

  async resendVerificationEmail(propertyId: string, email: string) {
    const user = await this.userRepo.findOne({ where: { email } })
    if (!user) throw HttpException.notFound(Message.notFound)

    const booking = await this.bookingRepo.findOne({
      where: { user: { id: user.id }, property: { id: propertyId } },
      relations: ['user', 'property'],
    })

    if (!booking) throw HttpException.notFound(Message.bookingNotFound)
    if (booking.isVerified) throw HttpException.badRequest(Message.bookingAlreadyVerified)

    if (isToday(booking.lastEmailSentAt) && booking.emailSentCount >= 100) {
      throw HttpException.tooManyRequests(Message.bookingEmailLimitReached)
    }

    booking.lastEmailSentAt = new Date()
    booking.emailSentCount += 1
    await this.bookingRepo.save(booking)

    const token = webTokenService.generateBookingToken({ bookingId: booking.id, email })
    const verifyUrl = `${EnvironmentConfiguration.FRONTEND_URL_LOCAL}/verify-booking?token=${token}`

    const mailOptions = {
      from: EnvironmentConfiguration.MAIL_FROM,
      to: email,
      subject: 'Verify Your Booking',
      text: 'Booking verification',
      html: generateHtml(
        user.fullName,
        new Date().toLocaleString(),
        `<p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
        <p style="line-height: 2vh; text-align: center;">
          Thank you for booking a property with us. To confirm your booking, please click the button below:
        </p>
        <p style="text-align: center;">
          <a href="${verifyUrl}" style="cursor: pointer; text-decoration: none; padding: 10px 20px; background-color: #4CAF50; color: white; border-radius: 5px;">
            Verify Booking
          </a>
        </p>
        <p style="text-align: center;">
          This link will expire in 24 hours for security reasons.
        </p>

        <b>Note:</b>
        <p style="font-size: 14px;">
          If you did not make this booking, you can safely ignore this email.
        </p>
      </p>`
      ),
    }

    await this.mailService.sendMail(mailOptions)

    return { success: true, message: 'Verification email resent' }
  }

  async updateBooking(bookingId: string, data: UpdateBookingDTO) {
    const booking = await this.bookingRepo.findOne({ where: { id: bookingId } })
    if (!booking) throw HttpException.notFound(Message.bookingNotFound)

    if (data.date) booking.date = new Date(data.date)
    if (data.status) {
      booking.status = data.status
      if (data.status === BookingStatus.confirmed) {
        booking.adminConfirmedAt = new Date()
      }
    }

    await this.bookingRepo.save(booking)
    return { success: true, message: Message.updated }
  }

  async getAllBookings({
    status,
    page,
    size,
    email,
  }: {
    status?: BookingStatus
    page: number
    size: number
    email?: string
  }) {
    const { limit, offset } = getPagination(page, size)

    const query = this.bookingRepo
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.user', 'user')
      .leftJoinAndSelect('booking.property', 'property')
      .orderBy('booking.createdAt', 'DESC')
      .skip(offset)
      .take(limit)

    if (status) {
      query.where('booking.status = :status', { status })
    }

    if (email) {
      query.andWhere('user.email = :email', { email })
    }

    const [bookings, total] = await query.getManyAndCount()
    const pagination = getPagingData(total, page, size)

    return { bookings, pagination }
  }

  async getOne(bookingId: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
      relations: ['user', 'property'],
    })

    if (!booking) {
      throw HttpException.notFound(Message.bookingNotFound)
    }

    return booking
  }
}

export default new BookingService()
