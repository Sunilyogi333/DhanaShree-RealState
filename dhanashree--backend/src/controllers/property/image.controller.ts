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
      images: savedImages.map(img => ({ id: img.id, url: img.url, type: img.type })),
    })
  }
}

export default new ImageController()
