import { IsEmail, IsDateString, IsOptional, IsString, IsUUID, IsEnum } from 'class-validator'
import { BookingStatus } from '../constants/enum/booking'

export class CreateBookingDTO {
  @IsEmail()
  email: string

  @IsString()
  fullName: string

  @IsString()
  phone: string

  @IsUUID()
  propertyId: string

  @IsDateString()
  date: string

  @IsOptional()
  @IsString()
  message?: string
}

export class UpdateBookingDTO {
  @IsOptional()
  @IsDateString()
  date?: string

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus
}
