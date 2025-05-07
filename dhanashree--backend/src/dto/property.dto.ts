import { IsNotEmpty, IsOptional, IsNumber, IsString, IsArray, IsUUID, ArrayNotEmpty } from 'class-validator'

export class CreatePropertyDTO {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  propertyCode: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsString()
  description: string

  @IsOptional()
  @IsString()
  propertyType?: string

  @IsOptional()
  @IsString()
  status?: string

  @IsOptional()
  @IsString()
  facing?: string

  @IsOptional()
  @IsNumber()
  bedrooms?: number

  @IsOptional()
  @IsNumber()
  bathrooms?: number

  @IsOptional()
  @IsNumber()
  kitchens?: number

  @IsOptional()
  @IsNumber()
  floors?: number

  @IsOptional()
  @IsString()
  furnishing?: string

  @IsOptional()
  @IsNumber()
  livingRooms?: number

  @IsOptional()
  @IsNumber()
  landArea?: number

  @IsOptional()
  @IsNumber()
  builtInArea?: number

  @IsOptional()
  @IsNumber()
  builtYear?: number

  // parking
  @IsOptional()
  @IsNumber()
  parking?: number

  //purpose
  @IsOptional()
  @IsString()
  purpose?: string
  // road
  @IsOptional()
  @IsString()
  road?: string

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

  // 🆕 New fields for image references
  @IsNotEmpty()
  @IsUUID()
  thumbnailId: string

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
  description?: string

  @IsOptional()
  @IsNumber()
  price?: number

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

  @IsOptional()
  @IsNumber()
  bedroomCount?: number

  @IsOptional()
  @IsNumber()
  bathroomCount?: number

  @IsOptional()
  @IsNumber()
  kitchenCount?: number

  @IsOptional()
  @IsNumber()
  floorCount?: number

  @IsOptional()
  @IsNumber()
  area?: number

  @IsOptional()
  @IsNumber()
  builtYear?: number

  @IsOptional()
  @IsString()
  facing?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[]

  @IsOptional()
  @IsString()
  furnishing?: string

  @IsOptional()
  @IsString()
  availability?: string

  @IsOptional()
  @IsString()
  propertyType?: string

  @IsOptional()
  @IsString()
  status?: string

  @IsOptional()
  @IsArray()
  imageFiles?: Express.Multer.File[]

  @IsOptional()
  thumbnailFile?: Express.Multer.File
}
