import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator'

export class AddressInput {
  @IsNotEmpty()
  @IsNumber()
  province: number

  @IsNotEmpty()
  @IsNumber()
  district: number

  @IsNotEmpty()
  @IsNumber()
  municipality: number

  @IsOptional()
  @IsNumber()
  ward?: number
}

export class UpdateAddressInput extends AddressInput {
  @IsNotEmpty()
  @IsUUID()
  id: string
}
