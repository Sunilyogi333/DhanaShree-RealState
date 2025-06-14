import { NextFunction, Request, Response } from 'express'
import { EnvironmentConfiguration } from '../config/env.config'
import { ROLE } from '../constants/enum'
import { Message } from '../constants/message'
import AdminService from '../services/admin/admin.service'
import HttpException from '../utils/HttpException'
import WebToken from '../utils/webToken.service'

const authentication = (allowedRoles?: ROLE | ROLE[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log('i am here')
    const { authorization } = req.headers

    if (!authorization) {
      throw HttpException.notFound(Message.unAuthorized)
    }

    const [mode, token] = authorization.trim().split(' ')

    if (!token || mode !== 'Bearer') {
      throw HttpException.badRequest(Message.invalidToken)
    }

    try {
      // Verify the token
      const decodedToken = WebToken.verify(token, EnvironmentConfiguration.ACCESS_TOKEN_SECRET)
      if (!decodedToken) {
        throw HttpException.unauthorized(Message.tokenExpire)
      }

      const { id, role } = decodedToken

      // Check if the user's role is allowed
      if (allowedRoles && Array.isArray(allowedRoles) && !allowedRoles.includes(role)) {
        HttpException.unauthorized(Message.unAuthorized)
      }

      // Fetch user from the database
      const user = await AdminService.getById(id)
      if (!user) {
        HttpException.unauthorized(Message.unAuthorized)
      }

      // Attach user to request object
      req.user = user

      return next()
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        throw HttpException.unauthorized(Message.tokenExpire)
      }

      console.error('Authentication Middleware Error:', err)
      throw HttpException.internalServerError(Message.internalServerError)
    }
  }
}

export default authentication
