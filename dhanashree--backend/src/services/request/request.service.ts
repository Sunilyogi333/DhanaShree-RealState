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

class RequestService {
  private requestRepo = AppDataSource.getRepository(RequestListing)
  private userRepo = AppDataSource.getRepository(User)
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
        throw HttpException.badRequest('You already have a pending/confirmed request.')
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
      const verifyUrl = `${EnvironmentConfiguration.FRONTEND_URL}/verify-request?token=${token}`

      await manager.save(request)

      const mailOptions = {
        from: EnvironmentConfiguration.MAIL_FROM,
        to: email,
        subject: 'Verify Your Request',
        text: 'Request verification',
        html: generateHtml(
          user.fullName,
          new Date().toLocaleString(),
          `<p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
      <p style="line-height: 2vh; text-align: center;">
        Thank you for submitting a property listing request. To confirm your request, please click the button below:
      </p>
      <p style="text-align: center;">
        <a href="${verifyUrl}" style="cursor: pointer; text-decoration: none; padding: 10px 20px; background-color: #4CAF50; color: white; border-radius: 5px;">
          Verify Request
        </a>
      </p>
      <p style="text-align: center;">
        This link will expire in 24 hours for security reasons.
      </p>

      <b>Note:</b>
      <p style="font-size: 14px;">
        If you did not make this request, you can safely ignore this email.
      </p>
    </p>`
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
      throw HttpException.unauthorized('Invalid token')
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

  async getOne(id: string) {
    const req = await this.requestRepo.findOne({ where: { id }, relations: ['user'] })
    if (!req) throw HttpException.notFound('Request not found')
    return req
  }

  async update(id: string, data: UpdateRequestDTO) {
    const req = await this.requestRepo.findOne({ where: { id } })
    if (!req) throw HttpException.notFound('Request not found')

    if (data.date) req.date = new Date(data.date)
    if (data.status) {
      req.status = data.status as RequestStatus
      if (data.status === RequestStatus.confirmed) {
        req.adminConfirmedAt = new Date()
      }
    }

    await this.requestRepo.save(req)
    return { success: true, message: 'Request updated' }
  }
}

export default new RequestService()
