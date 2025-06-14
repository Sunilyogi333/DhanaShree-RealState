import { Request, Response, NextFunction } from 'express'
import { fromBuffer } from 'file-type'
import HttpException from '../utils/HttpException'
import { Message } from '../constants/message'

export const validateImageBuffer = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Validating image buffer...')
  try {
    const files = (req.files as { [fieldname: string]: Express.Multer.File[] }) || {}
    console.log('Files received:', req.files)
    console.log('files body:', req.body)
    console.log('Files object:', files)

    const allFiles = Object.values(files).flat()

    if (!allFiles.length) {
      return next(HttpException.badRequest(Message.noFileUploaded))
    }

    const allowedTypes = ['image/jpeg', 'image/png']

    for (const file of allFiles) {
      const type = await fromBuffer(file.buffer)

      if (!type || !allowedTypes.includes(type.mime)) {
        return next(HttpException.badRequest(Message.invalidFileType))
      }
    }
    next()
  } catch (error) {
    console.error('File validation error:', error)
    return next(HttpException.internalServerError(Message.internalServerError))
  }
}
