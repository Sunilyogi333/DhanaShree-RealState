import { Request, Response } from 'express'
import { StatusCodes } from '../../constants/statusCodes'
import { Message } from '../../constants/message'
import { ResetForgotPasswordInput } from '../../dto/auth.dto'
import propertyService from '../../services/property/property.service'
import webTokenService from '../../utils/webToken.service'

class PropertyController {
  async bac(req: Request, res: Response) {
    const adminId = req.user?.id

    if (!adminId) {
      return res.status(401).json({ message: 'Unauthorized: Admin ID missing' })
    }

    const data = req.body
    const thumbnailFile = req.files?.['thumbnail']?.[0]
    const imageFiles = req.files?.['images'] as Express.Multer.File[]
    
    await propertyService.bac(adminId, data, thumbnailFile, imageFiles)
    res.status(StatusCodes.CREATED).json({ success: true, message: Message.created })
  }

  async create(req: Request, res: Response) {
    const adminId = req.user?.id
    if (!adminId) return res.status(401).json({ message: 'Unauthorized: Admin ID missing' })
  
    const data = req.body
    const imageIds: number[] = req.body.imageIds // expecting from frontend
  
    await propertyService.create(adminId, data, imageIds)
    res.status(StatusCodes.CREATED).json({ success: true, message: Message.created })
  }
  

  async update(req: Request, res: Response) {
    const adminId = req.user?.id

    if (!adminId) {
      return res.status(401).json({ message: 'Unauthorized: Admin ID missing' })
    }

    const propertyId = req.params.id
    const data = req.body
    const thumbnailFile = req.files?.['thumbnail']?.[0]
    const imageFiles = req.files?.['images'] as Express.Multer.File[]

    await propertyService.update(adminId, propertyId, data, thumbnailFile, imageFiles)
    res.status(StatusCodes.SUCCESS).json({ success: true, message: Message.updated })
  }

  async getAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1
    const size = parseInt(req.query.size as string) || 10

    const result = await propertyService.getAll(page, size)
    res.status(StatusCodes.SUCCESS).json({ success: true, data: result })
  }

  async getOne(req: Request, res: Response) {
    const propertyId = req.params.id
    const property = await propertyService.getOne(propertyId)
    res.status(StatusCodes.SUCCESS).json({ success: true, data: property })
  }

  async delete(req: Request, res: Response) {
    const adminId = req.user?.id
    if (!adminId) return res.status(401).json({ message: 'Unauthorized: Admin ID missing' })

    const propertyId = req.params.id
    await propertyService.delete(propertyId, adminId)
    res.status(StatusCodes.SUCCESS).json({ success: true, message: Message.deleted })
  }
}
export default new PropertyController()
