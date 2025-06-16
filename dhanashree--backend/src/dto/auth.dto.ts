import { IsEmail, IsNotEmpty, IsString, NotEquals } from 'class-validator'

export class ResetPasswordDTO {
  @IsNotEmpty()
  @IsString()
  newPassword: string

  @IsNotEmpty()
  @IsString()
  confirmPassword: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string
}

export class VerifyResetEmailDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string
}

export class ResetForgotPasswordInput {
  @IsNotEmpty()
  @IsString()
  token: string

  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export class UpdatePasswordDTO {
  @IsNotEmpty()
  @IsString()
  oldPassword: string

  @IsNotEmpty()
  @IsString()
  @NotEquals('oldPassword', { message: 'New password must be different from the old password' })
  newPassword: string
}
