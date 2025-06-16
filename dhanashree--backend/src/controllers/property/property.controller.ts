import { Request, Response } from 'express'
import { StatusCodes } from '../../constants/statusCodes'
import { Message } from '../../constants/message'
import propertyService from '../../services/property/property.service'
import HttpException from '../../utils/HttpException'
import { PropertyFilterOptions } from '../../types/property-filter-options.type'

class PropertyController {
  async create(req: Request, res: Response) {
    const adminId = req.user?.id
    if (!adminId) throw HttpException.unauthorized(Message.unAuthorized)

    const data = req.body
    const thumbnailImageId: string = req.body.thumbnailImageId
    const normalImageIds: string[] = req.body.normalImageIds

    await propertyService.create(adminId, data, thumbnailImageId, normalImageIds)
    return res.status(StatusCodes.CREATED).json({ success: true, message: Message.created })
  }

  async getAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1
    const size = parseInt(req.query.size as string) || 10

    const filters: PropertyFilterOptions = {
      propertyCode: req.query.propertyCode as string,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
      status: req.query.status as string,
      purpose: req.query.purpose as string,
      type: req.query.type
        ? Array.isArray(req.query.type)
          ? (req.query.type as string[])
          : (req.query.type as string).split(',')
        : undefined,
      district: req.query.district ? parseInt(req.query.district as string) : undefined,
      municipality: req.query.municipality ? parseInt(req.query.municipality as string) : undefined,
      sortBy: req.query.sortBy as 'createdAt' | 'price',
      order: req.query.order as 'asc' | 'desc',
    }

    const result = await propertyService.getAll(page, size, filters)

    return res.status(StatusCodes.SUCCESS).json({
      success: true,
      data: result,
      message: Message.fetched,
    })
  }

  async getOne(req: Request, res: Response) {
    const propertyId = req.params.id
    const property = await propertyService.getOne(propertyId)
    return res
      .status(StatusCodes.SUCCESS)
      .json({ success: true, data: property, message: Message.fetched })
  }

  async update(req: Request, res: Response) {
    const propertyId = req.params.id
    const adminId = req.user?.id

    if (!adminId) throw HttpException.unauthorized(Message.unAuthorized)

    const data = req.body
    await propertyService.update(propertyId, adminId, data)

    return res.status(StatusCodes.SUCCESS).json({
      success: true,
      message: Message.updated,
    })
  }

  async delete(req: Request, res: Response) {
    const adminId = req.user?.id
    if (!adminId) throw HttpException.unauthorized(Message.unAuthorized)

    const propertyId = req.params.id
    await propertyService.delete(propertyId)
    return res.status(StatusCodes.SUCCESS).json({ success: true, message: Message.deleted })
  }
}
export default new PropertyController()
