import { AppDataSource } from '../../config/database.config'
import { Property } from '../../entities/property/property.entity'
import { Image } from '../../entities/images/image.entity'
import cloudinaryService from '../cloudinary/cloudinary.service'
import HttpException from '../../utils/HttpException'

class ImageService {
  private imageRepo = AppDataSource.getRepository(Image)

  async uploadAndSave(thumbnail?: Express.Multer.File, imageFiles: Express.Multer.File[] = []): Promise<Image[]> {
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

  async updateImages(propertyId: string, files: { thumbnail?: Express.Multer.File; normal?: Express.Multer.File[] }) {
    return await AppDataSource.transaction(async (manager) => {
      const imageRepo = manager.getRepository(Image)
      const propertyRepo = manager.getRepository(Property)

      const property = await propertyRepo.findOne({
        where: { id: propertyId },
        relations: ['images'],
      })

      if (!property) throw HttpException.notFound('Property not found')

      const updatedImages: Image[] = []

      // ✅ Update thumbnail
      if (files.thumbnail) {
        const oldThumbnail = property.images.find((img) => img.type === 'thumbnail')

        // Upload new
        const uploadedThumb = await cloudinaryService.uploadImageBuffer(
          files.thumbnail.buffer,
          files.thumbnail.originalname
        )

        // Remove old if exists
        if (oldThumbnail) {
          await cloudinaryService.deleteByUrl(oldThumbnail.url) // safe to do this after DB delete
          await imageRepo.remove(oldThumbnail)
        }

        const newThumb = imageRepo.create({
          url: uploadedThumb.secure_url,
          type: 'thumbnail',
          property,
        })
        updatedImages.push(newThumb)
      }

      // ✅ Update normal images
      if (files.normal && files.normal.length > 0) {
        const oldNormals = property.images.filter((img) => img.type === 'normal')

        // Upload new ones first
        const newNormals: Image[] = []
        for (const file of files.normal) {
          const uploaded = await cloudinaryService.uploadImageBuffer(file.buffer, file.originalname)
          const image = imageRepo.create({
            url: uploaded.secure_url,
            type: 'normal',
            property,
          })
          newNormals.push(image)
        }

        // Remove old ones
        for (const img of oldNormals) {
          await cloudinaryService.deleteByUrl(img.url)
        }
        if (oldNormals.length > 0) {
          await imageRepo.remove(oldNormals)
        }

        updatedImages.push(...newNormals)
      }

      // Save all new images
      if (updatedImages.length > 0) {
        await imageRepo.save(updatedImages)
      }

      return {
        message: 'Images updated successfully',
        images: updatedImages.map((img) => ({
          id: img.id,
          url: img.url,
          type: img.type,
        })),
      }
    })
  }
}

export default new ImageService()
