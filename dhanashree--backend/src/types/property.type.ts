import { MultiLanguage } from '../constants/global'
import { ApartmentType, Facing, FurnishingType, UnitEnum, Zoning } from '../constants/enum/property'
import { Facilities } from '../constants/enum/property'

export interface PropertyDetails {
  bathrooms: number
  bedrooms: number
  builtInArea: UnitValue
  builtYear: number
  description: MultiLanguage
  facing: Facing
  facilities?: Facilities[]
  floors: number
  frontage: UnitValue
  furnishing: FurnishingType
  kitchens: number
  landArea: UnitValue
  livingRooms: number
  parking: number
  totalFloors: number
  apartmentType: ApartmentType
  zoning: Zoning
}

export interface UnitValue {
  unit: UnitEnum
  value: number
}
