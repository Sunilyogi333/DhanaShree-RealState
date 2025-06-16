import { AppDataSource } from '../../config/database.config'
import { EnvironmentConfiguration } from '../../config/env.config'
import { Message, getNotFoundMessage } from '../../constants/message'
import { ResetForgotPasswordInput, UpdatePasswordDTO } from '../../dto/auth.dto'
import Admin from '../../entities/admin/admin.entity'
import EmailService from '../email/email.service'
import HttpException from '../../utils/HttpException'
import BcryptService from '../../utils/bcrypt.utils'
import { generateHtml } from '../../utils/mail.template'
import webTokenService from '../../utils/webToken.service'
import adminService from '../admin/admin.service'
import { MultiLanguage } from '../../constants/global'

interface decodedToken {
  userId: string
  iat: number
  exp: number
}

class AuthService {
  constructor(
    private readonly adminRepo = AppDataSource.getRepository(Admin),
    private readonly mailService = new EmailService()
  ) {}

  async login(data: Admin) {
    const admin = await this.adminRepo.findOne({
      where: [{ email: data.email }],
      select: ['id', 'email', 'password'],
    })
    //send admin and admin in nepali
    if (!admin) throw HttpException.notFound(getNotFoundMessage('Admin', 'एडमिन'))
    const isPasswordMatched = await BcryptService.compare(data.password, admin.password)
    if (!isPasswordMatched) throw HttpException.notFound(Message.invalidCredentials)
    const adminData = await adminService.getById(admin.id)
    return {
      id: adminData.id,
      email: adminData.email,
      role: adminData.role,
    }
  }

  async logout(id: string) {
    const admin = await this.adminRepo.findOne({ where: { id: id } })

    if (!admin) throw HttpException.notFound(Message.notFound)

    admin.refreshToken = null
    await this.adminRepo.save(admin)

    return { message: 'Logged out successfully' }
  }

  async verifyEmail(email: string): Promise<Admin> {
    const admin = await this.adminRepo.findOne({ where: { email } })
    if (!admin) throw HttpException.notFound(Message.notFound)
    return admin
  }

  async setToken(id: string, refreshToken: string): Promise<MultiLanguage> {
    await this.adminRepo.update(id, { refreshToken })
    return Message.updated
  }

  // reset password starts here

  async resetPasswordEmail(email: string): Promise<string> {
    const admin = await this.adminRepo.findOne({
      where: { email },
      select: ['id', 'password', 'email'],
    })
    if (admin === null) throw HttpException.notFound(Message.notFound)

    console.log('admin', admin)
    console.log('email', email)

    // generate token with user id and old password
    const token = await webTokenService.usePasswordHashToMakeToken(admin.password, admin.id)
    const url = `${EnvironmentConfiguration.FRONTEND_URL}/reset-password/${token}/`
    const mailOptions = {
      from: EnvironmentConfiguration.MAIL_FROM,
      text: 'Password reset',
      to: admin.email,
      html: generateHtml(
        admin.email,
        new Date().toLocaleString(),
        `<p style="
        margin: 0;
        margin-top: 17px;
        font-weight: 500;
        letter-spacing: 0.56px;
      ">
          <p style="line-height: 2vh; text-align: center;">
              Please click on the link below to change your password.
          </p>
          <p>
              <a href=${url} style="cursor: pointer; text-decoration: none; height: 10px; padding: 8px; background-color: #FCAB64; color: black; border-radius: 5px; ">Change Password</a>
          </p>
          <p>
            The link will expire in 60 minutes.
          </p>

          <b>Note:</b> 
          <p>
            Please Ignore this email if you haven't requested.
          </p>

      </p>`
      ),
      subject: 'Password reset',
    }
    try {
      await this.mailService.sendMail(mailOptions)
    } catch (error) {
      HttpException.internalServerError(Message.internalServerError)
    }
    return 'Email sent successfully'
  }

  async ResetPassword(data: ResetForgotPasswordInput): Promise<MultiLanguage> {
    const decodeToken = (await webTokenService.decode(data?.token)) as decodedToken
    const admin = await this.adminRepo.findOne({
      where: {
        id: decodeToken?.userId,
      },
      select: ['id', 'password', 'email'],
    })
    if (admin === null) {
      throw HttpException.unauthorized(Message.unAuthorized)
    }
    const isSamePassword = await this?.isPasswordMatched(data?.password, admin)

    try {
      const resp = await webTokenService.verify(data?.token, admin?.password)
      console.log('resp', resp)
    } catch (error) {
      throw HttpException.unauthorized(Message.tokenExpire)
    }
    if (data?.email !== admin?.email) {
      throw HttpException.forbidden(Message.unAuthorized)
    } else if (isSamePassword) {
      throw HttpException.forbidden(Message.passwordShouldMatch)
    } else if (data?.email === admin?.email) {
      admin.password = await BcryptService.hash(data?.password)
      await admin.save()
    } else {
      throw HttpException.badRequest(Message.badRequest)
    }

    return Message.updated
  }

  async isPasswordMatched(password: string, admin: Admin): Promise<boolean> {
    return await BcryptService.compare(password, admin.password)
  }

  async updatePassword(data: UpdatePasswordDTO, id?: string) {
    try {
      const admin = await this.adminRepo.findOne({
        where: { id: id },
        select: ['id', 'email', 'password'],
      })

      if (!admin) throw HttpException.notFound(Message.notFound)

      const isPasswordMatched = await BcryptService.compare(data.oldPassword, admin.password)
      if (!isPasswordMatched) throw HttpException.notFound(Message.invalidCredentials)
      admin.password = await BcryptService.hash(data.newPassword)
      return await admin.save()
    } catch (err: any) {
      throw HttpException.notFound(err.message)
    }
  }
}

export default new AuthService()
