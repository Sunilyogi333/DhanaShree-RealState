import { IsDateString, IsEmail, IsOptional, IsString, IsEnum } from 'class-validator'
import { RequestStatus } from '../constants/enum/request'

export class CreateRequestDTO {
  @IsEmail()
  email: string

  @IsString()
  fullName: string

  @IsString()
  phone: string

  @IsDateString()
  date: string

  @IsOptional()
  @IsString()
  message?: string

  @IsString()
  address: string
}

export class UpdateRequestDTO {
  @IsOptional()
  @IsDateString()
  date?: string

  @IsOptional()
  @IsEnum(RequestStatus)
  status?: RequestStatus
}
