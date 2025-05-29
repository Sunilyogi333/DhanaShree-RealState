import { AppDataSource } from '../../config/database.config'
import { Property } from '../../entities/property/property.entity'
import { Image } from '../../entities/images/image.entity'
import cloudinaryService from '../cloudinary/cloudinary.service'
import HttpException from '../../utils/HttpException'
import { UpdatePropertyImagesDTO } from '../../dto/property.dto'

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

  async updateImages(propertyId: string, data: UpdatePropertyImagesDTO) {
    const { thumbnailImageId, normalImageIds = [], deletedImageIds = [] } = data

    return await AppDataSource.transaction(async (manager) => {
      const property = await manager.findOne(Property, {
        where: { id: propertyId },
        relations: ['images'],
      })
      if (!property) throw HttpException.notFound('Property not found')

      const allImageIds = [...normalImageIds, ...(thumbnailImageId ? [thumbnailImageId] : [])]
      const allImages = await manager.findByIds(Image, allImageIds)

      if (allImages.length !== allImageIds.length) {
        throw HttpException.badRequest('Some images not found')
      }

      const currentImages = property.images

      // ✅ Prevent thumbnail deletion
      const currentThumbnail = currentImages.find((img) => img.type === 'thumbnail')
      if (currentThumbnail?.id && deletedImageIds.includes(currentThumbnail.id)) {
        throw HttpException.badRequest('Cannot delete thumbnail image')
      }

      // ✅ Add/Replace thumbnail
      if (thumbnailImageId) {
        const newThumb = allImages.find((img) => img.id === thumbnailImageId)
        if (!newThumb) throw HttpException.notFound('Thumbnail image not found')
        newThumb.type = 'thumbnail'
      }

      // ✅ Attach new normal images
      const newNormalImages = allImages.filter((img) => normalImageIds.includes(img.id))
      newNormalImages.forEach((img) => (img.type = 'normal'))

      // ✅ Remove deleted images (only normal ones)
      const imagesToDelete = currentImages.filter((img) => deletedImageIds.includes(img.id) && img.type === 'normal')
      const remainingNormalImages = currentImages
        .filter((img) => img.type === 'normal' && !deletedImageIds.includes(img.id))
        .concat(newNormalImages)

      if (remainingNormalImages.length < 3) {
        throw HttpException.badRequest('At least 3 normal images must remain after update')
      }

      for (const img of imagesToDelete) {
        await cloudinaryService.deleteByUrl(img.url)
        await manager.remove(img)
      }

      // ✅ Final image list
      const finalImages = currentImages
        .filter((img) => !deletedImageIds.includes(img.id) && img.type !== 'normal')
        .concat(newNormalImages)

      if (thumbnailImageId && currentThumbnail?.id !== thumbnailImageId) {
        finalImages.push(allImages.find((img) => img.id === thumbnailImageId)!)
      }

      property.images = finalImages
      return await manager.save(property)
    })
  }
}

export default new ImageService()
