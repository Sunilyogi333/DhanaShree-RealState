import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { IJwtOptions, IJwtPayload } from '../interfaces/jwt.interface'
import { EnvironmentConfiguration } from '../config/env.config'
import { ROLE } from '../constants/enum'

class WebTokenService {
  sign(user: IJwtPayload, options: IJwtOptions, role: ROLE) {
    const payload = {
      id: user.id,
      role,
    }

    const signOptions: SignOptions = {
      expiresIn: options.expiresIn,
    }

    return jwt.sign(payload, options.secret as string, signOptions)
  }

  verify(token: string, secret: string): any {
    return jwt.verify(token, secret)
  }

  generateAccessToken(user: IJwtPayload, role: ROLE) {
    return this.sign(
      user,
      {
        expiresIn: EnvironmentConfiguration.ACCESS_TOKEN_EXPIRES_IN,
        secret: EnvironmentConfiguration.ACCESS_TOKEN_SECRET,
      },
      role
    )
  }

  generateTokens(user: IJwtPayload, role: ROLE) {
    const accessToken = this.sign(
      user,
      {
        expiresIn: EnvironmentConfiguration.ACCESS_TOKEN_EXPIRES_IN,
        secret: EnvironmentConfiguration.ACCESS_TOKEN_SECRET,
      },
      role
    )

    const refreshToken = this.sign(
      user,
      {
        expiresIn: EnvironmentConfiguration.REFRESH_TOKEN_EXPIRES_IN,
        secret: EnvironmentConfiguration.REFRESH_TOKEN_SECRET,
      },
      role
    )
    return { accessToken, refreshToken }
  }

  async usePasswordHashToMakeToken(password: string, userId: string): Promise<string> {
    const secret = password
    const token = jwt.sign({ userId }, secret, {
      expiresIn: 3600, // 60 minutes
    })
    return token
  }

  async decode(token: string): Promise<string | JwtPayload | null> {
    const payload = jwt.decode(token)
    return payload
  }

  generateBookingToken(payload: { bookingId: string; email: string }) {
    return jwt.sign(payload, EnvironmentConfiguration.ACCESS_TOKEN_SECRET, {
      expiresIn: '24h',
    })
  }

  verifyBookingToken(token: string): { bookingId: string; email: string } {
    try {
      return jwt.verify(token, EnvironmentConfiguration.ACCESS_TOKEN_SECRET) as {
        bookingId: string
        email: string
      }
    } catch (err) {
      throw new Error('Invalid or expired token')
    }
  }
}

export default new WebTokenService()
