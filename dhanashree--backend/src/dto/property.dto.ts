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
import { ApartmentType, Facing, PropertyStatus, PropertyType, Purpose } from '../constants/enum/property'
import { MultiLanguageDTO } from './multiLanguage.dto'
import { Facilities, Zoning } from '../constants/enum/property'
import { UnitEnum } from '../constants/enum/property'

class UnitValueDTO {
  @IsNotEmpty()
  @IsEnum(UnitEnum)
  unit: UnitEnum

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
  @Type(() => UnitValueDTO)
  builtInArea?: UnitValueDTO

  @IsOptional()
  @IsNumber()
  builtYear?: number

  @IsOptional()
  @Type(() => MultiLanguageDTO)
  description?: MultiLanguageDTO

  @IsOptional()
  @IsEnum(Facing)
  facing?: Facing

  @IsOptional()
  @IsArray()
  @IsEnum(Facilities, { each: true })
  facilities?: Facilities[]

  @IsOptional()
  @IsNumber()
  floors?: number

  @IsOptional()
  @Type(() => UnitValueDTO)
  frontage?: UnitValueDTO

  @IsOptional()
  @IsString()
  furnishing?: string

  @IsOptional()
  @IsNumber()
  kitchens?: number

  @ValidateNested()
  @Type(() => UnitValueDTO)
  landArea: UnitValueDTO

  @IsOptional()
  @IsNumber()
  livingRooms?: number

  @IsOptional()
  @IsNumber()
  parking?: number

  @IsOptional()
  @IsNumber()
  totalFloors?: number

  @IsOptional()
  @IsEnum(ApartmentType, {
    message: 'Invalid apartment type',
  })
  apartmentType?: ApartmentType

  @IsOptional()
  @IsEnum(Zoning)
  zoning?: Zoning
}

export class CreatePropertyDTO {
  @IsNumber()
  price: number

  @IsString()
  propertyCode: string

  @IsEnum(PropertyType, {
    message: 'Invalid property type',
  })
  type: PropertyType

  @IsEnum(PropertyStatus, {
    message: 'Invalid property status',
  })
  status: PropertyStatus

  @IsEnum(Purpose, {
    message: 'Invalid purpose',
  })
  purpose: Purpose

  @ValidateNested()
  @Type(() => PropertyDetailsDTO)
  details: PropertyDetailsDTO

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
  propertyCode?: string

  @IsOptional()
  @IsNumber()
  price?: number

  @IsOptional()
  @IsEnum(PropertyType)
  type?: PropertyType

  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus

  @IsOptional()
  @IsEnum(Purpose)
  purpose?: Purpose

  @IsOptional()
  @ValidateNested()
  @Type(() => PropertyDetailsDTO)
  details?: PropertyDetailsDTO

  @IsOptional()
  @IsNumber()
  province?: number

  @IsOptional()
  @IsNumber()
  district?: number

  @IsOptional()
  @IsNumber()
  municipality?: number

  @IsOptional()
  @IsNumber()
  ward?: number

  @IsArray()
  @IsUUID('all', { each: true })
  imageIds: string[] // All image IDs (old + new)
}
