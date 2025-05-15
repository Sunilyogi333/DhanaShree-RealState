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

class PropertyService {
  private propertyRepository = AppDataSource.getRepository(Property)
  private addressRepository = AppDataSource.getRepository(Address)
  private imageRepository = AppDataSource.getRepository(Image)

  async create(adminId: string, data: CreatePropertyDTO, imageIds: number[]) {
    const createdAddress = await addressService.create({
      province: +data.province,
      district: +data.district,
      municipality: +data.municipality,
      ward: +data.ward,
    })

    const admin = await AppDataSource.getRepository(Admin).findOne({ where: { id: adminId } })
    if (!admin) throw new Error('Admin not found')

    const images = await this.imageRepository.findByIds(imageIds)
    const propertyCode = await this.generateUniquePropertyCode()

    const { price, type, status, propertyDetails } = data

    const propertyData: Partial<Property> = {
      propertyCode,
      price,
      type: type,
      status: status as any,
      propertyDetails: propertyDetails as any,
      address: createdAddress,
      admin,
      images,
    }

    const property = this.propertyRepository.create(propertyData)
    return await this.propertyRepository.save(property)
  }

  private async generateUniquePropertyCode(): Promise<string> {
    let code = '' // 🔧 Initialize to an empty string

    while (true) {
      code = Math.floor(100000 + Math.random() * 900000).toString()
      const existing = await this.propertyRepository.findOne({ where: { propertyCode: code } })
      if (!existing) break
    }

    return code
  }

  async getAll(page: number, size: number) {
    const { limit, offset } = getPagination(page, size)

    const [properties, total] = await this.propertyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.images', 'images')
      .leftJoinAndSelect('property.address', 'address')
      .leftJoinAndSelect('property.admin', 'admin')
      .select([
        'property.id',
        'property.propertyCode',
        'property.type',
        'property.price',
        'property.propertyDetails',
        'images.url',
        'images.id',
        'images.type',
        'address.province',
        'address.district',
        'address.municipality',
        'address.ward',
        'property.createdAt',
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
    const property = await this.propertyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.images', 'images')
      .leftJoinAndSelect('property.address', 'address')
      .leftJoinAndSelect('property.admin', 'admin')
      .select([
        'property.id',
        'property.propertyCode',
        'property.type',
        'property.price',
        'property.propertyDetails',
        'images.url',
        'images.id',
        'images.type',
        'address.province',
        'address.district',
        'address.municipality',
        'address.ward',
      ])
      .where('property.id = :propertyId', { propertyId })
      .getOne()

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
