import { StatusCodes } from '../constants/statusCodes'
import { MultiLanguage } from '../constants/global'

class HttpException extends Error {
  statusCode: number
  isOperational: boolean
  localizedMessage: MultiLanguage

  constructor(
    localizedMessage: MultiLanguage,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(localizedMessage.en) // Error class needs a string, so use English as base
    this.statusCode = statusCode
    this.localizedMessage = localizedMessage
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }

  static notFound(message: MultiLanguage) {
    return new HttpException(message, StatusCodes.NOT_FOUND)
  }
  static badRequest(message: MultiLanguage) {
    return new HttpException(message, StatusCodes.BAD_REQUEST)
  }
  static conflict(message: MultiLanguage) {
    return new HttpException(message, StatusCodes.CONFLICT)
  }
  static methodNotAllowed(message: MultiLanguage) {
    return new HttpException(message, StatusCodes.METHOD_NOT_ALLOWED)
  }
  static unauthorized(message: MultiLanguage) {
    return new HttpException(message, StatusCodes.UNAUTHORIZED)
  }
  static forbidden(message: MultiLanguage) {
    return new HttpException(message, StatusCodes.FORBIDDEN)
  }
  static tooManyRequests(message: MultiLanguage) {
    return new HttpException(message, StatusCodes.TOO_MANY_REQUESTS)
  }
  static internalServerError(message: MultiLanguage) {
    return new HttpException(message, StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

export default HttpException
