import { District } from '../entities/address/district.entity'
import { Municipality } from '../entities/address/municipality.entity'
import { Province } from '../entities/address/province.entity'
import { Ward } from '../entities/address/ward.entity'

export interface IAddressValidationResponse {
  province: Province
  district: District
  municipality: Municipality
  ward: Ward
}

export interface IGetAll {
  page: number
  perPage: number
  search?: string
  sort?: string
}
