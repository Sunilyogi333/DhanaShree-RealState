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

class RequestService {
  private requestRepo = AppDataSource.getRepository(RequestListing)
  private mailService = new EmailService()

  async create(data: CreateRequestDTO) {
    const { fullName, email, phone, date, message, address } = data
    const userEmail = email.toLowerCase()

    return await AppDataSource.transaction(async (manager) => {
      let user = await manager.findOne(User, { where: { email: userEmail } })
      if (!user) {
        user = manager.create(User, { fullName, email: userEmail, phone })
        await manager.save(user)
      }

      const existing = await manager.findOne(RequestListing, {
        where: { user },
        order: { createdAt: 'DESC' },
      })

      if (existing && existing.status !== RequestStatus.cancelled && existing.status !== RequestStatus.success) {
        throw HttpException.badRequest(Message.requestAlreadyExists)
      }

      const request = manager.create(RequestListing, {
        user,
        date,
        message,
        address,
        isVerified: false,
        status: RequestStatus.pending,
        emailSentCount: 0,
        lastEmailSentAt: new Date(),
      })

      const token = webTokenService.generateBookingToken({ bookingId: request.id, email: userEmail })
      const verifyUrl = `${EnvironmentConfiguration.FRONTEND_URL_LOCAL}/verify-request?token=${token}`

      await manager.save(request)

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

      return { success: true, message: 'Request verification email sent' }
    })
  }

  async verify(token: string) {
    const payload = webTokenService.verifyBookingToken(token)
    const request = await this.requestRepo.findOne({ where: { id: payload.bookingId }, relations: ['user'] })

    if (!request || request.user.email !== payload.email) {
      throw HttpException.unauthorized(Message.notAuthorized)
    }

    if (request.isVerified) return { success: true, message: 'Already verified' }

    request.isVerified = true
    await this.requestRepo.save(request)

    return { success: true, message: 'Request verified successfully' }
  }

  async getAll({ status, page, size, email }: { status?: RequestStatus; page: number; size: number; email?: string }) {
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
    
    if (request.isVerified) throw HttpException.badRequest(Message.requestAlreadyVerified)
    if (request.emailSentCount >= 3) throw HttpException.badRequest(Message.requestEmailLimitReached)
    if (request.lastEmailSentAt && new Date().getTime() - request.lastEmailSentAt.getTime() < 24 * 60 * 60 * 1000) {
      throw HttpException.badRequest(Message.requestEmailLimitReached)
    }
    request.emailSentCount += 1
    request.lastEmailSentAt = new Date()
    await this.requestRepo.save(request)
    const token = webTokenService.generateBookingToken({ bookingId: request.id, email: request.user.email })
    const verifyUrl = `${EnvironmentConfiguration.FRONTEND_URL_LOCAL}/verify-request?token=${token}`
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
    return { success: true, message: Message.requestVerificationEmailSent }
  }     

  async getOne(id: string) {
    const req = await this.requestRepo.findOne({ where: { id }, relations: ['user'] })
    if (!req) throw HttpException.notFound(Message.requestNotFound)
    return req
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

    await this.requestRepo.save(req)
    return { success: true, message: Message.updated }
  }
}

export default new RequestService()
