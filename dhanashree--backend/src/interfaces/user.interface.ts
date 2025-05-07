import { Request, Response } from 'express'

export interface IUserController {
  register(req: Request, res: Response): void
}

export interface IMultiLanguage {
  en: string
  ne: string
}
