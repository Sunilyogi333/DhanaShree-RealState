import multer from 'multer'
import { Request } from 'express'
import HttpException from '../utils/HttpException'
import { Message } from '../constants/message'

// ---- Multer Config using Memory Storage ---- //
const storage = multer.memoryStorage()

// ---- File Filter ---- //
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(HttpException.badRequest(Message.invalidFileType))
  }
}

// ---- Multer Instance ---- //
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max per file
  },
})

export default upload
