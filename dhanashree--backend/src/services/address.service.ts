import { AppDataSource } from '../config/database.config'
import { Address } from '../entities/address/address.entity'
import { District } from '../entities/address/district.entity'
import { Municipality } from '../entities/address/municipality.entity'
import { Province } from '../entities/address/province.entity'
import { Ward } from '../entities/address/ward.entity'
import { IAddressValidationResponse } from '../interfaces/global.interface'
import HttpException from '../utils/HttpException'
import { AddressInput } from '../dto/address.dto'
import { Message, getNotFoundMessage } from '../constants/message'

class AddressService {
  constructor(
    private readonly provinceRepository = AppDataSource.getRepository(Province),
    private readonly districtRepository = AppDataSource.getRepository(District),
    private readonly municipalityRepository = AppDataSource.getRepository(Municipality),
    private readonly wardRepository = AppDataSource.getRepository(Ward),
    private readonly addressRepository = AppDataSource.getRepository(Address)
  ) {}

  async getProvinces(): Promise<Province[]> {
    return await this.provinceRepository.find()
  }

  async getDistricts(provinceID: number): Promise<District[]> {
    return await this.districtRepository.find({
      where: {
        province: {
          id: +provinceID,
        },
      },
    })
  }

  async getDistrict(districtID: number): Promise<District> {
    const district = await this.districtRepository.findOne({
      where: {
        id: districtID,
      },
    })
    if (!district) throw HttpException.notFound(getNotFoundMessage('district', 'जिल्ला'))

    return district
  }

  async getMunicipalities(districtID: number): Promise<Municipality[]> {
    return await this.municipalityRepository.find({
      where: {
        district: {
          id: +districtID,
        },
      },
    })
  }

  async getWards(municipalityID: number): Promise<Ward[]> {
    return await this.wardRepository.find({
      where: {
        municipality: {
          id: municipalityID,
        },
      },
    })
  }

  async getWard(wardID: number): Promise<Ward> {
    const ward = await this.wardRepository.findOne({
      where: {
        id: wardID,
      },
    })
    if (!ward) throw HttpException.notFound(getNotFoundMessage('ward', 'वडा'))

    return ward
  }

  async getAllDistrict(): Promise<District[]> {
    const districts = await this.districtRepository.find()
    return districts
  }

  async validate(data: AddressInput): Promise<null | IAddressValidationResponse> {
    const province = await this.provinceRepository.findOne({
      where: {
        id: data.province,
      },
    })
    const district = await this.districtRepository.findOne({
      where: { id: data.district },
    })

    const municipality = await this.municipalityRepository.findOne({
      where: { id: data.municipality },
    })
    const ward = await this.wardRepository.findOne({
      where: { id: data.ward },
    })

    const [provinceData, districtData, municipalityData, wardData] = await Promise.all([
      province,
      district,
      municipality,
      ward,
    ])

    if (!provinceData || !districtData || !municipalityData || !wardData) {
      return null
    }
    return {
      province: provinceData,
      district: districtData,
      municipality: municipalityData,
      ward: wardData,
    }
  }

  async create(data: AddressInput): Promise<Address> {
    const address = new Address()
    const addressData = await this.validate(data)
    if (!addressData) throw HttpException.notFound(getNotFoundMessage('address', 'ठेगाना'))

    address.province = addressData.province
    address.district = addressData.district
    address.municipality = addressData.municipality
    address.ward = addressData.ward
    return await this.addressRepository.save(address)
  }

  async update(addressID: string, data: AddressInput): Promise<Address> {
    const addressData = await this.validate(data)
    const address = await this.addressRepository.findOne({
      where: { id: addressID },
    })
    if (!addressData || !address)
      throw HttpException.notFound(getNotFoundMessage('address', 'ठेगाना'))

    address.province = addressData.province
    address.district = addressData.district
    address.municipality = addressData.municipality
    address.ward = addressData.ward
    return await this.addressRepository.save(address)
  }

  async delete(id: string): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
    })

    if (!address) throw HttpException.notFound(getNotFoundMessage('address', 'ठेगाना'))

    return await this.addressRepository.softRemove(address)
  }

  async findWard(id: number): Promise<Ward> {
    const ward = await this.wardRepository.findOne({
      where: { id },
    })
    if (!ward) throw HttpException.notFound(getNotFoundMessage('Ward', 'वडा'))

    return ward
  }

  async findDistrict(id: number): Promise<District> {
    const district = await this.districtRepository.findOne({
      where: { id },
    })
    if (!district) throw HttpException.notFound(getNotFoundMessage('District', 'जिल्ला'))

    return district
  }
}

export default new AddressService()
