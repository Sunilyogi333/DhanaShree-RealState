import { AppDataSource } from '../../config/database.config'
import { RequestListing } from '../../entities/request/request.entity'
import { User } from '../../entities/user/user.entity'
import HttpException from '../../utils/HttpException'
import EmailService from '../email/email.service'
import webTokenService from '../../utils/webToken.service'
import { CreateRequestDTO, UpdateRequestDTO } from '../../dto/request.dto'
import { EnvironmentConfiguration } from '../../config/env.config'
import { generateHtml } from '../../utils/mail.template'
import { RequestStatus } from '../../constants/enum/request'
import { getPagination, getPagingData } from '../../utils/pagination'
import { Message } from '../../constants/message'
import { getRequestVerificationTemplate } from '../../utils/templates/requestVerificaton.template'
import { isToday } from '../../utils/date.utils'

class RequestService {
  private requestRepo = AppDataSource.getRepository(RequestListing)
  private mailService = new EmailService()

  async create(data: CreateRequestDTO) {
    const { fullName, email, phone, date, message, address } = data

    return await AppDataSource.transaction(async (manager) => {
      let user = await manager.findOne(User, { where: { email } })

      const lowerEmail = email.toLowerCase()
      if (!user) {
        user = manager.create(User, { fullName, email: lowerEmail, phone })
        await manager.save(user)
      }

      const requestRepo = manager.getRepository(RequestListing)

      // Get latest request
      const existing = await requestRepo.findOne({
        where: { user },
        order: { createdAt: 'DESC' },
      })

      // If already verified and not cancelled/success, block
      if (
        existing &&
        existing.status !== RequestStatus.cancelled &&
        existing.status !== RequestStatus.success &&
        existing.isVerified
      ) {
        throw HttpException.badRequest(Message.alreadyVerified)
      }

      // Reuse or create
      let request = existing

      if (
        !request ||
        request.status === RequestStatus.cancelled ||
        request.status === RequestStatus.success
      ) {
        request = requestRepo.create({
          user,
          date,
          message,
          address,
          isVerified: false,
          status: RequestStatus.pending,
          emailSentCount: 0,
        })
      }

      // Rate limit resend
      if (
        request.lastEmailSentAt &&
        isToday(request.lastEmailSentAt) &&
        request.emailSentCount >= 100 // or any limit you prefer
      ) {
        throw HttpException.tooManyRequests(Message.emailLimitReached)
      }

      request.lastEmailSentAt = new Date()
      request.emailSentCount += 1

      const result = await requestRepo.save(request)

      // Generate token + send email
      const token = webTokenService.generateBookingToken({
        bookingId: request.id,
        email: lowerEmail,
      })
      const verifyUrl = `${EnvironmentConfiguration.FRONTEND_URL}/verify-request?token=${token}`

      const mailOptions = {
        from: EnvironmentConfiguration.MAIL_FROM,
        to: email,
        subject: 'Verify Your Request',
        text: 'Request verification',
        html: generateHtml(
          user.fullName,
          new Date().toLocaleString(),
          getRequestVerificationTemplate(verifyUrl)
        ),
      }

      await this.mailService.sendMail(mailOptions)

      return result
    })
  }

  async verify(token: string) {
    const payload = webTokenService.verifyBookingToken(token)
    const request = await this.requestRepo.findOne({
      where: { id: payload.bookingId },
      relations: ['user'],
    })

    if (!request || request.user.email !== payload.email) {
      throw HttpException.unauthorized(Message.unAuthorized)
    }

    if (request.isVerified) return { alreadyVerified: true, request }

    request.isVerified = true
    const result = await this.requestRepo.save(request)
    return { alreadyVerified: false, request: result }
  }

  async getAll({
    status,
    page,
    size,
    email,
  }: {
    status?: RequestStatus
    page: number
    size: number
    email?: string
  }) {
    const { limit, offset } = getPagination(page, size)

    const query = this.requestRepo
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.user', 'user')
      .orderBy('request.createdAt', 'DESC')
      .skip(offset)
      .take(limit)

    if (status) query.where('request.status = :status', { status })
    if (email) query.andWhere('user.email = :email', { email })

    const [requests, total] = await query.getManyAndCount()
    const pagination = getPagingData(total, page, size)

    return { requests, pagination }
  }

  async resendVerificationEmail(id: string) {
    const request = await this.requestRepo.findOne({ where: { id }, relations: ['user'] })
    if (!request) throw HttpException.notFound(Message.requestNotFound)

    if (request.isVerified) throw HttpException.badRequest(Message.alreadyVerified)
    if (isToday(request.lastEmailSentAt) && request.emailSentCount >= 100) {
      throw HttpException.tooManyRequests(Message.emailLimitReached)
    }
    request.emailSentCount += 1
    request.lastEmailSentAt = new Date()
    await this.requestRepo.save(request)
    const token = webTokenService.generateBookingToken({
      bookingId: request.id,
      email: request.user.email,
    })
    const verifyUrl = `${EnvironmentConfiguration.FRONTEND_URL}/verify-request?token=${token}`
    const mailOptions = {
      from: EnvironmentConfiguration.MAIL_FROM,
      to: request.user.email,
      subject: 'Resend Request Verification',
      text: 'Request verification',
      html: generateHtml(
        request.user.fullName,
        new Date().toLocaleString(),
        getRequestVerificationTemplate(verifyUrl)
      ),
    }
    await this.mailService.sendMail(mailOptions)
    return {
      requestId: request.id,
      email: request.user.email,
    }
  }

  async getOne(id: string) {
    const request = await this.requestRepo.findOne({ where: { id }, relations: ['user'] })
    if (!request) throw HttpException.notFound(Message.requestNotFound)
    return request
  }

  async update(id: string, data: UpdateRequestDTO) {
    const req = await this.requestRepo.findOne({ where: { id } })
    if (!req) throw HttpException.notFound(Message.requestNotFound)

    if (data.date) req.date = new Date(data.date)
    if (data.status) {
      req.status = data.status as RequestStatus
      if (data.status === RequestStatus.confirmed) {
        req.adminConfirmedAt = new Date()
      }
    }

    const result = await this.requestRepo.save(req)
    return result
  }
}

export default new RequestService()
