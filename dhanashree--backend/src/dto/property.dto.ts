import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsArray,
  IsEnum,
  IsUUID,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { PropertyStatus, PropertyType } from '../constants/enum/property'
import { MultiLanguageDTO } from './multiLanguage.dto'
import { facilities } from '../constants/enum/property'


class LandAreaDTO {
  @IsNotEmpty()
  @IsString()
  unit: string

  @IsNotEmpty()
  @IsNumber()
  value: number
}

class PropertyDetailsDTO {
  @IsOptional()
  @IsNumber()
  bathrooms?: number

  @IsOptional()
  @IsNumber()
  bedrooms?: number

  @IsOptional()
  @IsNumber()
  builtInArea?: number

  @IsOptional()
  @IsNumber()
  builtYear?: number

  @IsOptional()
  @Type(() => MultiLanguageDTO)
  description?: MultiLanguageDTO

  @IsOptional()
  @IsString()
  facing?: string

  @IsOptional()
  @IsArray()
  @IsEnum(facilities, { each: true })
  facilities?: facilities[]

  @IsOptional()
  @IsNumber()
  floors?: number

  @IsOptional()
  @IsString()
  Frontage?: string

  @IsOptional()
  @IsString()
  furnishing?: string

  @IsOptional()
  @IsNumber()
  kitchens?: number

  @ValidateNested()
  @Type(() => LandAreaDTO)
  landArea: LandAreaDTO

  @IsOptional()
  @IsNumber()
  livingRooms?: number

  @IsOptional()
  @IsNumber()
  parking?: number

  @IsOptional()
  @IsString()
  road?: string

  @IsOptional()
  @IsNumber()
  totalFloors?: number

  @IsOptional()
  @IsString()
  type?: string

  @IsOptional()
  @IsString()
  zoning?: string
}

export class CreatePropertyDTO {
  @IsOptional()
  @IsNumber()
  price?: number

  @IsOptional()
  @IsEnum(PropertyType, {
    message: "Invalid property type",
  })
  type?: PropertyType

  @IsOptional()
  @IsEnum(PropertyStatus, {
    message: "Invalid property status",
  })
  status?: PropertyStatus

  @ValidateNested()
  @Type(() => PropertyDetailsDTO)
  propertyDetails: PropertyDetailsDTO

  @IsNotEmpty()
  @IsNumber()
  province: number

  @IsNotEmpty()
  @IsNumber()
  district: number

  @IsNotEmpty()
  @IsNumber()
  municipality: number

  @IsNotEmpty()
  @IsNumber()
  ward: number

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  imageIds: string[]
}

export class UpdatePropertyDTO {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  propertyCode?: string

  @IsOptional()
  @IsNumber()
  price?: number

  @IsOptional()
  @IsString()
  propertyType?: string

  @IsOptional()
  @IsString()
  status?: string

  @IsOptional()
  @ValidateNested()
  @Type(() => PropertyDetailsDTO)
  propertyDetails?: PropertyDetailsDTO

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  imageIds?: string[]
}
