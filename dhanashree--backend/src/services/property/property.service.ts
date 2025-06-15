import { AppDataSource } from '../../config/database.config'
import { Property } from '../../entities/property/property.entity'
import Admin from '../../entities/admin/admin.entity'
import cloudinaryService from '../../services/cloudinary/cloudinary.service'
import { Address } from '../../entities/address/address.entity'
import { Image } from '../../entities/images/image.entity'
import { CreatePropertyDTO, UpdatePropertyDTO } from '../../dto/property.dto'
import { getPagination, getPagingData } from '../../utils/pagination'
import HttpException from '../../utils/HttpException'
import { PropertyDetails } from '../../types/property.type'
import { Message } from '../../constants/message'

class PropertyService {
  constructor(private readonly propertyRepository = AppDataSource.getRepository(Property)) {}

  async create(adminId: string, data: CreatePropertyDTO, thumbnailImageId: string, normalImageIds: string[]) {
    const admin = await AppDataSource.getRepository(Admin).findOne({ where: { id: adminId } })
    if (!admin) throw HttpException.notFound(Message.notFound)

    const existingProperty = await this.propertyRepository.findOne({ where: { propertyCode: data.propertyCode } })
    if (existingProperty) throw HttpException.notFound(Message.propertyCodeAlreadyExists)

    if (normalImageIds.length < 3) {
      throw HttpException.badRequest(Message.atLeastThreeNormalImages)
    }

    return await AppDataSource.transaction(async (manager) => {
      const imageRepo = manager.getRepository(Image)

      const allImageIds = [thumbnailImageId, ...normalImageIds]

      const usedImagesCount = await imageRepo
        .createQueryBuilder('image')
        .where('image.id IN (:...ids)', { ids: allImageIds })
        .andWhere('image.property IS NOT NULL')
        .getCount()

      if (usedImagesCount > 0) {
        throw HttpException.badRequest(Message.invalidImageIds)
      }

      const thumbnail = await imageRepo.findOne({ where: { id: thumbnailImageId } })
      if (!thumbnail || thumbnail.type !== 'thumbnail') {
        throw HttpException.badRequest(Message.invalidImageIds)
      }

      const normalImages = await imageRepo.findByIds(normalImageIds)
      if (normalImages.length !== normalImageIds.length) {
        throw HttpException.notFound(Message.invalidImageIds)
      }

      const address = manager.getRepository(Address).create({
        province: { id: +data.province },
        district: { id: +data.district },
        municipality: { id: +data.municipality },
        ward: { id: +data.ward },
      })

      const savedAddress = await manager.save(address)

      const property = this.propertyRepository.create({
        propertyCode: data.propertyCode.toUpperCase(),
        price: data.price,
        type: data.type,
        status: data.status,
        purpose: data.purpose,
        details: data.details as any,
        address: savedAddress,
        admin,
        images: [thumbnail, ...normalImages],
      })

      return await manager.save(property)
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

    // Default: exclude sold unless explicitly asked
    if (!filters.status) {
      query.andWhere('property.status != :sold', { sold: 'sold' })
    }

    // Filters
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

    if (filters.type && Array.isArray(filters.type) && filters.type.length > 0) {
      query.andWhere('property.type IN (:...types)', { types: filters.type })
    }

    if (filters.district) {
      query.andWhere('district.id = :districtId', { districtId: filters.district })
    }

    if (filters.municipality) {
      query.andWhere('municipality.id = :municipalityId', { municipalityId: filters.municipality })
    }

    // Sorting
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
      results: modifiedData,
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

  async update(propertyId: string, adminId: string, data: UpdatePropertyDTO) {
    return await AppDataSource.transaction(async (manager) => {
      const property = await manager.findOne(Property, {
        where: { id: propertyId },
        relations: ['images', 'address'],
      })

      if (!property) throw HttpException.notFound(Message.notFound)

      // Update address if needed
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

      // Manually assign core fields
      // Check for duplicate property code
      if (data.propertyCode) {
        const code = data.propertyCode.toUpperCase()

        const existingPropertyWithCode = await manager.findOne(Property, {
          where: { propertyCode: code },
        })

        // If a different property already has this code, throw error
        if (existingPropertyWithCode && existingPropertyWithCode.id !== property.id) {
          throw HttpException.badRequest(Message.propertyCodeAlreadyExists)
        }

        property.propertyCode = code
      }
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

      return await manager.save(property)
    })
  }

  async delete(propertyId: string) {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
      relations: ['images'],
    })
    if (!property) throw HttpException.notFound(Message.notFound)

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
