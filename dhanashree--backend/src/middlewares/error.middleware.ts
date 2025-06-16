import { NextFunction, Request, Response } from 'express'
import { EnvironmentConfiguration } from '../config/env.config'
import multer from 'multer'
import { Environment } from '../constants/enum'
import { Message } from '../constants/message'
import { MultiLanguage } from '../constants/global'

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.debug('Error Handler')
  console.error(error)

  // ✅ Handle Multer errors
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: {
          en: 'Each image must be under 10MB.',
          ne: 'प्रत्येक छवि १० एमबी भन्दा कम हुनुपर्छ।',
        },
        data: [],
      })
    }

    return res.status(400).json({
      success: false,
      message: {
        en: `Multer error: ${error.message}`,
        ne: `मल्टर त्रुटि: ${error.message}`,
      },
      data: [],
    })
  }

  const statusCode = error.isOperational ? error.statusCode : 500

  let message: MultiLanguage

  if (error.localizedMessage) {
    message = error.localizedMessage
  } else if (typeof error.message === 'object' && 'en' in error.message && 'ne' in error.message) {
    message = error.message
  } else {
    message = Message.internalServerError
  }

  const data = {
    success: false,
    message,
    data: [],
    ...(EnvironmentConfiguration.NODE_ENV === Environment.DEVELOPMENT && {
      originalError: error.stack,
    }),
  }

  res.status(statusCode).json(data)
}

export default errorHandler
