import { Request, Response } from 'express'
import imageService from '../../services/property/images.service'
import { StatusCodes } from '../../constants/statusCodes'

class ImageController {
  async upload(req: Request, res: Response) {
    const thumbnail = req.files?.['thumbnail']?.[0]
    const images = req.files?.['images'] as Express.Multer.File[]

    const savedImages = await imageService.uploadAndSave(thumbnail, images)

    return res.status(StatusCodes.CREATED).json({
      success: true,
      images: savedImages.map((img) => ({ id: img.id, url: img.url, type: img.type })),
    })
  }

  async updateImages(req: Request, res: Response) {
    const propertyId = req.params.propertyId
    const thumbnail = req.files?.['thumbnail']?.[0] as Express.Multer.File
    const images = req.files?.['images'] as Express.Multer.File[]

    const result = await imageService.updateImages(propertyId, {
      thumbnail,
      normal: images,
    })

    return res.status(StatusCodes.SUCCESS).json({
      success: true,
      message: 'Images updated',
      images: result.images.map((img) => ({
        id: img.id,
        url: img.url,
        type: img.type,
      })),
    })
  }
}

export default new ImageController()
