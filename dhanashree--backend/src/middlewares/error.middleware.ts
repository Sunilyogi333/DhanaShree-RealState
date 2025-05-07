import { NextFunction, Request, Response } from 'express'
import { EnvironmentConfiguration } from '../config/env.config'
import multer from 'multer'
import { Environment } from '../constants/enum'
import { Message } from '../constants/message'

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.debug('Error Handler')
  console.error(error)

  // ✅ Handle Multer errors
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Each image must be under 10MB.' })
    }
    return res.status(400).json({ message: `Multer error: ${error.message}` })
  }

  const statusCode = error.isOperational ? error.statusCode : 500

  const data = {
    success: false,
    message: error.isOperational ? error.message : Message.server,
    data: [],
    ...(EnvironmentConfiguration.NODE_ENV === Environment.DEVELOPMENT && { originalError: error.message }),
  }

  res.status(statusCode).json(data)
}

export default errorHandler
