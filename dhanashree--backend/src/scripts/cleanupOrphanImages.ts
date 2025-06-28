import { AppDataSource } from '../config/database.config'
import { Image } from '../entities/images/image.entity'
import cloudinaryService from '../services/cloudinary/cloudinary.service'
import { LessThan, IsNull } from 'typeorm'

export default async function orphanImageCleanup() {
  const SIX_HOURS_AGO = new Date(Date.now() - 6 * 60 * 60 * 1000)

  const imageRepo = AppDataSource.getRepository(Image)

  const orphanImages = await imageRepo.find({
    where: {
      propertyId: IsNull(),
      createdAt: LessThan(SIX_HOURS_AGO),
    },
  })

  if (!orphanImages.length) {
    console.log('No orphan images found.')
    return
  }

  console.log(`Found ${orphanImages.length} orphan images. Deleting...`)

  for (const image of orphanImages) {
    await cloudinaryService.deleteByUrl(image.url)
  }

  await imageRepo.remove(orphanImages)

  console.log(`Deleted ${orphanImages.length} orphan images.`)
}
