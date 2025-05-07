// src/services/property.service.ts
import { AppDataSource } from '../../config/database.config'
import { Property } from '../../entities/property/property.entity'
import Admin from '../../entities/admin/admin.entity'
import cloudinaryService from '../../services/cloudinary/cloudinary.service'
import { Address } from '../../entities/address/address.entity'
import addressService from '../../services/address.service'
import { Image } from '../../entities/images/image.entity'
import { CreatePropertyDTO } from '../../dto/property.dto'
import { Province } from '../../entities/address/province.entity'
import { District } from '../../entities/address/district.entity'
import { getPagination, getPagingData } from '../../utils/pagination'

class PropertyService {
  private propertyRepository = AppDataSource.getRepository(Property)
  private addressRepository = AppDataSource.getRepository(Address)
  private imageRepository = AppDataSource.getRepository(Image)

  async bac(
    adminId: string,
    data: CreatePropertyDTO,
    thumbnailFile: Express.Multer.File,
    imageFiles: Express.Multer.File[]
  ) {
    const createdAddress = await addressService.create({
      province: +data.province,
      district: +data.district,
      municipality: +data.municipality,
      ward: +data.ward,
    })

    if (!createdAddress) throw new Error('Address not found')

    const images: Image[] = []

    // Upload thumbnail
    if (thumbnailFile) {
      const upload = await cloudinaryService.uploadImageBuffer(thumbnailFile.buffer, thumbnailFile.originalname)
      if (upload?.secure_url) {
        const image = new Image()
        image.url = upload.secure_url
        image.type = 'thumbnail'
        images.push(image)
      }
    }

    // Upload other images
    for (const file of imageFiles) {
      const upload = await cloudinaryService.uploadImageBuffer(file.buffer, file.originalname)
      if (upload?.secure_url) {
        const image = new Image()
        image.url = upload.secure_url
        image.type = 'normal'
        images.push(image)
      }
    }

    // Fetch the Admin to associate with Property
    const admin = await AppDataSource.getRepository(Admin).findOne({ where: { id: adminId } })
    if (!admin) throw new Error('Admin not found')

    // Explicitly type the data to help TypeScript understand the shape
    const propertyData: Partial<Property> = {
      name: data.name,
      propertyCode: data.propertyCode,
      price: data.price,
      description: data.description,
      // propertyType: data.propertyType,
      // status: data.status,
      facing: data.facing,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      kitchens: data.kitchens,
      floors: data.floors,
      // furnishing: data.furnishing,
      livingRooms: data.livingRooms,
      landArea: data.landArea,
      builtInArea: data.builtInArea,
      builtYear: data.builtYear,
      parking: data.parking,
      // purpose: data.purpose,
      road: data.road,
      address: createdAddress,
      admin,
      images,
    }

    const property = this.propertyRepository.create(propertyData)
    return await this.propertyRepository.save(property)
  }

  async create(
    adminId: string,
    data: CreatePropertyDTO,
    imageIds: number[]
  ) {
    const createdAddress = await addressService.create({
      province: +data.province,
      district: +data.district,
      municipality: +data.municipality,
      ward: +data.ward,
    })
  
    const admin = await AppDataSource.getRepository(Admin).findOne({ where: { id: adminId } })
    if (!admin) throw new Error('Admin not found')
  
    const images = await this.imageRepository.findByIds(imageIds)
  
    const propertyData: Partial<Property> = {
      ...data,
      address: createdAddress,
      admin,
      images,
    }
  
    const property = this.propertyRepository.create(propertyData)
    return await this.propertyRepository.save(property)
  }
  

  async update(
    propertyId: string,
    adminId: string,
    data: Partial<CreatePropertyDTO>,
    thumbnailFile?: Express.Multer.File,
    imageFiles?: Express.Multer.File[]
  ) {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId, admin: { id: adminId } },
      relations: ['images', 'address'],
    })
    if (!property) throw new Error('Property not found or unauthorized')

    // Update text fields if provided
    if (data.name) property.name = data.name
    if (data.price) property.price = data.price
    if (data.description) property.description = data.description

    // ✅ Replace address if any address fields are provided
    if (data.province || data.district || data.municipality || data.ward) {
      const createdAddress = await addressService.create({
        province: +data.province!,
        district: +data.district!,
        municipality: +data.municipality!,
        ward: +data.ward!,
      })
      property.address = createdAddress
    }

    // Replace thumbnail if new one is uploaded
    if (thumbnailFile) {
      const oldThumb = property.images.find((img) => img.type === 'thumbnail')
      if (oldThumb) await cloudinaryService.deleteByUrl(oldThumb.url)

      const upload = await cloudinaryService.uploadImageBuffer(thumbnailFile.buffer, thumbnailFile.originalname)
      if (upload?.secure_url) {
        const newThumb = new Image()
        newThumb.url = upload.secure_url
        newThumb.type = 'thumbnail'
        property.images = property.images.filter((img) => img.type !== 'thumbnail')
        property.images.push(newThumb)
      }
    }

    // Replace or add normal images
    if (imageFiles?.length) {
      const normalImages = property.images.filter((img) => img.type === 'normal')
      for (const img of normalImages) {
        await cloudinaryService.deleteByUrl(img.url)
      }
      property.images = property.images.filter((img) => img.type !== 'normal')

      for (const file of imageFiles) {
        const upload = await cloudinaryService.uploadImageBuffer(file.buffer, file.originalname)
        if (upload?.secure_url) {
          const image = new Image()
          image.url = upload.secure_url
          image.type = 'normal'
          property.images.push(image)
        }
      }
    }

    return await this.propertyRepository.save(property)
  }
  async getAll(page: number, size: number) {
    const { limit, offset } = getPagination(page, size)

    const [properties, total] = await this.propertyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.images', 'images')
      .leftJoinAndSelect('property.address', 'address')
      .leftJoinAndSelect('property.admin', 'admin')
      .select([
        'property.name',
        'property.price',
        'images.url',
        'address.province',
        'address.district',
        'address.municipality',
        'address.ward',
        'admin.id',
      ])
      .skip(offset)
      .take(limit)
      .orderBy('property.createdAt', 'DESC')
      .getManyAndCount()

    // Pagination info
    const pagination = getPagingData(total, page, size)

    return { properties, pagination }
  }

  async getOne(propertyId: string) {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
      relations: ['images', 'address', 'admin'],
    })

    if (!property) {
      throw new Error('Property not found')
    }

    return property
  }

  async delete(propertyId: string, adminId: string) {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId, admin: { id: adminId } },
      relations: ['images'],
    })
    if (!property) throw new Error('Property not found or unauthorized')

    // Delete images from Cloudinary
    for (const image of property.images) {
      await cloudinaryService.deleteByUrl(image.url)
    }

    // Delete the property
    return await this.propertyRepository.remove(property)
  }
  async getProvinces() {}
}

export default new PropertyService()
