import { Request, Response } from 'express'
import imageService from '../../services/property/images.service'
import { StatusCodes } from '../../constants/statusCodes'
import { UpdatePropertyImagesDTO } from '../../dto/property.dto'
import { Message } from '../../constants/message'

class ImageController {
  async upload(req: Request, res: Response) {
    const thumbnail = req.files?.['thumbnail']?.[0]
    const images = req.files?.['images'] as Express.Multer.File[]

    const savedImages = await imageService.uploadAndSave(thumbnail, images)

    return res.status(StatusCodes.CREATED).json({
      success: true,
      images: savedImages.map((img) => ({ id: img.id, url: img.url, type: img.type })),
      message: Message.created,
    })
  }

  async updateImages(req: Request, res: Response) {
    const propertyId = req.params.propertyId
    const data: UpdatePropertyImagesDTO = req.body

    const result = await imageService.updateImages(propertyId, data)
    return res
      .status(StatusCodes.SUCCESS)
      .json({ success: true, message: Message.updated, data: result })
  }
}

export default new ImageController()
