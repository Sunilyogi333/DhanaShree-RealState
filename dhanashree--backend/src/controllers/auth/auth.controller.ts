import { Request, Response } from 'express'
import { StatusCodes } from '../../constants/statusCodes'
import { Message } from '../../constants/message'
import { ResetForgotPasswordInput } from '../../dto/auth.dto'
import authService from '../../services/auth/auth.service'
import webTokenService from '../../utils/webToken.service'

class AuthController {
  async login(req: Request, res: Response) {
    const data = await authService.login(req.body)
    const tokens = webTokenService.generateTokens(
      {
        id: data.id,
      },
      data.role
    )

    await authService.setToken(data.id, tokens.refreshToken)

    res.status(200).json({
      data: {
        admin: data,
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      },
      message: Message.loginSuccessfully,
    })
  }

  async Logout(req: Request, res: Response) {
    const adminId = req.user?.id
    if (!adminId) {
      return res.status(400).json({
        status: false,
        message: 'Admin ID not found in request',
      })
    }
    await authService.logout(adminId)
    res.status(200).json({
      status: true,
      message: Message.logoutSuccessfully,
    })
  }

  // password reset email
  async sendPasswordResetEmail(req: Request, res: Response) {
    await authService.resetPasswordEmail(req.body.email)
    res.status(StatusCodes.SUCCESS).json({
      status: true,
      message: Message.passwordResetEmailSent,
    })
  }

  // reset password
  async resetPassword(req: Request, res: Response) {
    const data = req.body as ResetForgotPasswordInput
    await authService.ResetPassword(data)
    res.status(StatusCodes.SUCCESS).json({
      status: true,
      message: Message.updated,
    })
  }

  async updatePassword(req: Request, res: Response) {
    const data = await authService.updatePassword(req.body, req.user?.id)
    res.status(200).json({
      status: true,
      message: Message.updated,
    })
  }
}
export default new AuthController()
