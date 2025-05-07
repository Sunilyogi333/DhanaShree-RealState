import { AppDataSource } from '../../config/database.config'
import { Image } from '../../entities/images/image.entity'
import cloudinaryService from '../cloudinary/cloudinary.service'

class ImageService {
  private imageRepo = AppDataSource.getRepository(Image)

  async uploadAndSave(
    thumbnail?: Express.Multer.File,
    imageFiles: Express.Multer.File[] = []
  ): Promise<Image[]> {
    const images: Image[] = []

    if (thumbnail) {
      const uploaded = await cloudinaryService.uploadImageBuffer(thumbnail.buffer, thumbnail.originalname)
      const thumb = this.imageRepo.create({ url: uploaded.secure_url, type: 'thumbnail' })
      images.push(thumb)
    }

    for (const img of imageFiles) {
      const uploaded = await cloudinaryService.uploadImageBuffer(img.buffer, img.originalname)
      const image = this.imageRepo.create({ url: uploaded.secure_url, type: 'normal' })
      images.push(image)
    }

    return await this.imageRepo.save(images)
  }
}

export default new ImageService()
