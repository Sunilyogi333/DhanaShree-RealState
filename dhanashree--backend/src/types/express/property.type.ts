import { MultiLanguage } from '../../constants/global'
import { UnitEnum } from '../../constants/enum/property'
import { facilities } from '../../constants/enum/property'

export interface PropertyDetails {
  bathrooms: number
  bedrooms: number
  builtInArea: number
  builtYear: number
  description: MultiLanguage
  facing: MultiLanguage
  facilities?: facilities[]  
  floors: number
  Frontage: string //ask
  furnishing: string
  kitchens: number
  landArea: LandArea
  livingRooms: number
  parking: number
  road: MultiLanguage
  totalFloors: number
  type: string //ask            
  zoning: MultiLanguage //ask
}

export interface LandArea {
  unit: UnitEnum
  value: number
}