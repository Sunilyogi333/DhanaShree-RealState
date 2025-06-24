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
import { getBookingVerificationTemplate } from '../../utils/templates/bookingVerification.template'

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
      if (
        existingBooking &&
        existingBooking.status !== BookingStatus.cancelled &&
        existingBooking.isVerified
      ) {
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
        throw HttpException.tooManyRequests(Message.emailLimitReached)
      }

      booking.lastEmailSentAt = new Date()
      booking.emailSentCount += 1

      const result = await bookingRepo.save(booking)

      // ✅ Generate token and email
      const token = webTokenService.generateBookingToken({ bookingId: booking.id, email })
      const verifyUrl = `${EnvironmentConfiguration.FRONTEND_URL}/verify-booking?token=${token}`

      const mailOptions = {
        from: EnvironmentConfiguration.MAIL_FROM,
        text: 'Booking verification',
        to: email,
        html: generateHtml(
          user.fullName,
          new Date().toLocaleString(),
          getBookingVerificationTemplate(verifyUrl)
        ),
        subject: 'Verify Your Booking',
      }

      try {
        await this.mailService.sendMail(mailOptions)
      } catch (error) {
        throw HttpException.internalServerError(Message.internalServerError)
      }

      return result
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
      return { alreadyVerified: true, booking }
    }

    booking.isVerified = true
    const result = await this.bookingRepo.save(booking)

    return { alreadyVerified: false, booking: result }
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
      throw HttpException.tooManyRequests(Message.emailLimitReached)
    }

    booking.emailSentCount += 1
    booking.lastEmailSentAt = new Date()
    await this.bookingRepo.save(booking)

    const token = webTokenService.generateBookingToken({ bookingId: booking.id, email })
    const verifyUrl = `${EnvironmentConfiguration.FRONTEND_URL}/verify-booking?token=${token}`

    const mailOptions = {
      from: EnvironmentConfiguration.MAIL_FROM,
      to: email,
      subject: 'Verify Your Booking',
      text: 'Booking verification',
      html: generateHtml(
        user.fullName,
        new Date().toLocaleString(),
        getBookingVerificationTemplate(verifyUrl)
      ),
    }

    await this.mailService.sendMail(mailOptions)

    return {
      bookingId: booking.id,
      propertyId: booking.property.id,
      email: booking.user.email,
    }
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

    const result = await this.bookingRepo.save(booking)
    return result
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

    return { results: bookings, pagination }
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
