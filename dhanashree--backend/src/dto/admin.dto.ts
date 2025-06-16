import { IsEmail, IsNotEmpty, IsString, IsUUID, NotEquals } from 'class-validator'

export class AdminDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
