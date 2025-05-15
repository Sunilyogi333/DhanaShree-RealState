import { NextFunction, Request, Response } from 'express'
import { EnvironmentConfiguration } from '../config/env.config'
import { ROLE } from '../constants/enum'
import { Message } from '../constants/message'
import AdminService from '../services/admin/admin.service'
import HttpException from '../utils/HttpException'
import WebToken from '../utils/webToken.service'

const authentication = (allowedRoles?: ROLE | ROLE[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("i am here");
    const { authorization } = req.headers
    // console.log('Authorization:', authorization);

    if (!authorization) {
      return next(HttpException.notFound('Authorization token not found'))
    }

    const [mode, token] = authorization.trim().split(' ')

    if (!token || mode !== 'Bearer') {
      return next(HttpException.badRequest('Invalid token format'))
    }

    try {
      // Verify the token
      const decodedToken = WebToken.verify(token, EnvironmentConfiguration.ACCESS_TOKEN_SECRET)
      if (!decodedToken) {
        return next(HttpException.unauthorized(Message.tokenExpire))
      }

      const { id, role } = decodedToken

      // Check if the user's role is allowed
      if (allowedRoles && Array.isArray(allowedRoles) && !allowedRoles.includes(role)) {
        return next(HttpException.unauthorized(Message.NOT_AUTHORIZED_MESSAGE))
      }

      // Fetch user from the database
      const user = await AdminService.getById(id)
      if (!user) {
        return next(HttpException.unauthorized('User not found or unauthorized'))
      }

      // Attach user to request object
      req.user = user

      return next()
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        return next(HttpException.unauthorized('Your token has expired. Please login again.'))
      }

      console.error('Authentication Middleware Error:', err)
      return next(HttpException.internalServerError('An error occurred during authentication'))
    }
  }
}

export default authentication
