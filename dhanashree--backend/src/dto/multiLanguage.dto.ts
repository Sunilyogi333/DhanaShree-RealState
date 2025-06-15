// multi-language.dto.ts
import { IsString, IsNotEmpty } from 'class-validator'

export class MultiLanguageDTO {
  @IsString()
  @IsNotEmpty()
  en: string

  @IsString()
  @IsNotEmpty()
  ne: string
}
