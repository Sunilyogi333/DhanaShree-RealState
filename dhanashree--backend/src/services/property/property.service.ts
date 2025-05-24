// src/services/property.service.ts
import { AppDataSource } from '../../config/database.config'
import { Property } from '../../entities/property/property.entity'
import Admin from '../../entities/admin/admin.entity'
import cloudinaryService from '../../services/cloudinary/cloudinary.service'
import { Address } from '../../entities/address/address.entity'
import addressService from '../../services/address.service'
import { Image } from '../../entities/images/image.entity'
import { CreatePropertyDTO, UpdatePropertyDTO } from '../../dto/property.dto'
import { getPagination, getPagingData } from '../../utils/pagination'
import HttpException from '../../utils/HttpException'
import { UnitEnum, Facing, Zoning, ApartmentType, FurnishingType } from '../../constants/enum/property'
import { PropertyDetails } from '../../types/express/property.type'

class PropertyService {
  constructor(private readonly propertyRepository = AppDataSource.getRepository(Property)) {}

  async create(adminId: string, data: CreatePropertyDTO, imageIds: number[]) {
    // 1. Fetch admin
    const admin = await AppDataSource.getRepository(Admin).findOne({ where: { id: adminId } })
    if (!admin) {
      throw HttpException.notFound('Admin not found')
    }

    // 2. Check propertyCode uniqueness
    const existingProperty = await this.propertyRepository.findOne({ where: { propertyCode: data.propertyCode } })
    if (existingProperty) {
      throw HttpException.notFound(`Property with code ${data.propertyCode} already exists`)
    }

    return await AppDataSource.transaction(async (transactionalEntityManager) => {
      // 3. Check if any image is already attached
      const associatedImagesCount = await transactionalEntityManager
        .createQueryBuilder(Image, 'image')
        .where('image.id IN (:...imageIds)', { imageIds })
        .andWhere('image.property IS NOT NULL')
        .getCount()

      if (associatedImagesCount > 0) {
        throw HttpException.notFound('Some images are already associated with a property')
      }

      // 4. Fetch images
      const images = await transactionalEntityManager.findByIds(Image, imageIds)

      if (images.length !== imageIds.length) {
        throw HttpException.notFound('Some images not found')
      }

      // ✅ 5. Enforce exactly one thumbnail
      const thumbnailCount = images.filter((img) => img.type === 'thumbnail').length
      if (thumbnailCount !== 1) {
        throw HttpException.notFound('Exactly one thumbnail is required. Found: ' + thumbnailCount)
      }

      // ✅ 6. Inline address creation (inside transaction)
      const address = transactionalEntityManager.getRepository(Address).create({
        province: { id: +data.province },
        district: { id: +data.district },
        municipality: { id: +data.municipality },
        ward: { id: +data.ward },
      })

      const createdAddress = await transactionalEntityManager.save(Address, address)

      // 7. Create property
      const propertyData: Partial<Property> = {
        propertyCode: data.propertyCode.toUpperCase(),
        price: data.price,
        type: data.type,
        status: data.status,
        purpose: data.purpose,
        details: data.details as any,
        address: createdAddress,
        admin,
        images,
      }

      const property = this.propertyRepository.create(propertyData)
      return await transactionalEntityManager.save(property)
    })
  }

  async getAll(page: number, size: number, filters: any) {
    const { limit, offset } = getPagination(page, size)

    const query = this.propertyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.images', 'images', 'images.type = :type', { type: 'thumbnail' })
      .leftJoinAndSelect('property.address', 'address')
      .leftJoinAndSelect('address.province', 'province')
      .leftJoinAndSelect('address.district', 'district')
      .leftJoinAndSelect('address.municipality', 'municipality')
      .leftJoinAndSelect('address.ward', 'ward')
      .skip(offset)
      .take(limit)

    // ✅ Default: exclude sold unless explicitly asked
    if (!filters.status) {
      query.andWhere('property.status != :sold', { sold: 'sold' })
    }

    // ✅ Filters
    if (filters.propertyCode) {
      query.andWhere('LOWER(property.propertyCode) = LOWER(:propertyCode)', {
        propertyCode: filters.propertyCode,
      })
    }

    if (filters.price) {
      query.andWhere('property.price = :price', { price: filters.price })
    }

    if (filters.status) {
      query.andWhere('property.status = :status', { status: filters.status })
    }

    if (filters.purpose) {
      query.andWhere('property.purpose = :purpose', { purpose: filters.purpose })
    }

    if (filters.type) {
      query.andWhere('property.type = :type', { type: filters.type })
    }

    if (filters.district) {
      query.andWhere('district.id = :districtId', { districtId: filters.district })
    }

    if (filters.municipality) {
      query.andWhere('municipality.id = :municipalityId', { municipalityId: filters.municipality })
    }

    // ✅ Sorting
    const sortBy = filters.sortBy === 'price' ? 'property.price' : 'property.createdAt' 
    const order: 'ASC' | 'DESC' = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'

    query.orderBy(sortBy, order)

    const [propertyData, total] = await query.getManyAndCount()

    const pagination = getPagingData(total, page, size)

    const modifiedData = propertyData.map((property) => {
      const { details, ...rest } = property

      return {
        ...rest,
        details: {
          frontage: details?.frontage || null,
          landArea: details?.landArea || null,
        },
      }
    })

    return {
      properties: modifiedData,
      pagination,
    }
  }

  async getOne(propertyId: string) {
    const property = await this.propertyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.images', 'images')
      .leftJoinAndSelect('property.address', 'address')
      .leftJoinAndSelect('address.province', 'province')
      .leftJoinAndSelect('address.district', 'district')
      .leftJoinAndSelect('address.municipality', 'municipality')
      .leftJoinAndSelect('address.ward', 'ward')
      .where('property.id = :propertyId', { propertyId })
      .getOne()

    if (!property) {
      throw new Error('Property not found')
    }

    return property
  }

  // src/services/property/property.service.ts

  async update(propertyId: string, adminId: string, data: UpdatePropertyDTO, imageIds: string[]) {
    return await AppDataSource.transaction(async (manager) => {
      const property = await manager.findOne(Property, {
        where: { id: propertyId },
        relations: ['images', 'address'],
      })

      if (!property) throw HttpException.notFound('Property not found')

      // ✅ Fetch & Validate new images
      const images = await manager.findByIds(Image, imageIds)
      if (images.length !== imageIds.length) {
        throw HttpException.badRequest('Some images not found')
      }

      const thumbnailCount = images.filter((img) => img.type === 'thumbnail').length
      const normalCount = images.filter((img) => img.type === 'normal').length

      if (thumbnailCount !== 1) {
        throw HttpException.badRequest('Exactly one thumbnail is required')
      }
      if (normalCount < 3) {
        throw HttpException.badRequest('At least 3 normal images are required')
      }

      // ✅ Remove orphaned images
      const oldImageIds = property.images.map((img) => img.id)
      const toDelete = oldImageIds.filter((oldId) => !imageIds.includes(oldId))

      if (toDelete.length > 0) {
        const imagesToDelete = property.images.filter((img) => toDelete.includes(img.id))
        for (const img of imagesToDelete) {
          await cloudinaryService.deleteByUrl(img.url)
        }
        await manager.remove(imagesToDelete)
      }

      // ✅ Update address if needed
      if (data.province || data.district || data.municipality || data.ward) {
        if (!property.address) {
          property.address = manager.create(Address, {})
        }

        if (data.province) property.address.province = { id: data.province } as any
        if (data.district) property.address.district = { id: data.district } as any
        if (data.municipality) property.address.municipality = { id: data.municipality } as any
        if (data.ward) property.address.ward = { id: data.ward } as any

        await manager.save(Address, property.address)
      }

      // ✅ Manually assign core fields
      if (data.propertyCode) property.propertyCode = data.propertyCode.toUpperCase()
      if (data.price !== undefined) property.price = data.price
      if (data.type) property.type = data.type
      if (data.status) property.status = data.status
      if (data.purpose) property.purpose = data.purpose
      if (data.details) {
        const updatedDetails = {
          ...property.details,
          ...data.details,

          ...(data.details.builtInArea && {
            builtInArea: {
              unit: data.details.builtInArea.unit,
              value: data.details.builtInArea.value,
            },
          }),

          ...(data.details.frontage && {
            frontage: {
              unit: data.details.frontage.unit,
              value: data.details.frontage.value,
            },
          }),

          ...(data.details.facing && {
            facing: data.details.facing,
          }),

          ...(data.details.apartmentType && {
            apartmentType: data.details.apartmentType,
          }),

          ...(data.details.zoning && {
            zoning: data.details.zoning,
          }),

          ...(data.details.furnishing && {
            furnishing: data.details.furnishing,
          }),
        }

        property.details = updatedDetails as PropertyDetails
      }

      // ✅ Update images & address references
      property.images = images
      property.address = property.address

      return await manager.save(property)
    })
  }

  async delete(propertyId: string) {
    console.log('property herr ta', propertyId)
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
      relations: ['images'],
    })
    if (!property) throw HttpException.notFound('Property not found')

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
