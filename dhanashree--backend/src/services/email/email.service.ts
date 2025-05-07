import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { EnvironmentConfiguration } from '../../config/env.config'
import { IMailOptions } from '../../interfaces/mailOptions.interface'

interface IData {
  email: string
  password: string
  for?: string
}

class EmailService {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>
  private readonly from: string

  constructor() {
    this.from = EnvironmentConfiguration.MAIL_FROM!
    this.transporter = nodemailer.createTransport({
      host: EnvironmentConfiguration.MAIL_HOST,
      port: +EnvironmentConfiguration.MAIL_PORT!,
      secure: false,
      requireTLS: true,
      auth: {
        user: EnvironmentConfiguration.MAIL_USERNAME,
        pass: EnvironmentConfiguration.MAIL_PASSWORD,
      },
    })
  }
  async sendMail({ to, html, subject, text }: IMailOptions) {
    const mailOptions = {
      from: `DhanaShree ${this.from}`,
      text,
      to,
      html,
      subject,
    }

    try {
      const response = await this.transporter.sendMail(mailOptions)
      console.log('Mail sent successfully. Response:', response)
      return response
    } catch (error) {
      console.error('Error sending mail:', error)
      throw error
    }
  }
}

export default EmailService
