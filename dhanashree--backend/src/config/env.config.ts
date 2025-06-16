import 'dotenv/config'
import { type IEnvironmentConfiguration } from '../interfaces/envConfig.interface'

export const EnvironmentConfiguration: IEnvironmentConfiguration = {
  NODE_ENV: process.env.NODE_ENV ?? '',
  APP_NAME: process.env.APP_NAME ?? '',
  PORT: process.env.PORT !== undefined ? parseInt(process.env.PORT) : 5000,
  BASE_URL: process.env.BASE_URL ?? '',
  CLIENT_URL: process.env.CLIENT_URL ?? '',

  //Database Configurations
  DATABASE_HOST: process.env.DATABASE_HOST ?? '',
  DATABASE_PORT: +process.env.DATABASE_PORT!,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME ?? '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? '',
  DATABASE_NAME: process.env.DATABASE_NAME ?? '',
  DATABASE_URL: process.env.DATABASE_URL ?? '',

  FRONTEND_URL: process.env.FRONTEND_URL ?? '',
  FRONTEND_URL_LOCAL: process.env.FRONTEND_URL_LOCAL ?? '',

  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? '',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? '',

  //JWT Configuration
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? '',
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN ?? '',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? '',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN ?? '',
  FORGET_PASSWORD_SECRET: process.env.FORGET_PASSWORD_SECRET ?? '',
  FORGET_PASSWORD_EXPIRES_IN: process.env.FORGET_PASSWORD_EXPIRES_IN ?? '',

  //Verification Token
  VERIFICATION_TOKEN_SECRET: process.env.VERIFICATION_TOKEN ?? '',
  VERIFICATION_TOKEN_EXPIRES_IN: process.env.VERIFICATION_TOKEN_EXPIRES_IN ?? '',

  //Google Configuration
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',
  CALLBACK_URL: process.env.CALLBACK_URL ?? '',
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN ?? '',
  GOOGLE_ACCESS_TOKEN: process.env.GOOGLE_ACCESS_TOKEN ?? '',

  //* Email Information
  MAIL_HOST: process.env.MAIL_HOST ?? '',
  MAIL_AUTH: process.env.MAIL_AUTH ?? '',
  MAIL_PASSWORD: process.env.MAIL_PASSWORD ?? '',
  MAIL_PORT: process.env.MAIL_PORT ?? '',
  MAIL_USERNAME: process.env.MAIL_USERNAME ?? '',
  MAIL_FROM: process.env.MAIL_FROM ?? '',

  //Cloudinary Configuration
  CLOUD_NAME: process.env.CLOUD_NAME ?? '',
  CLOUD_API_KEY: process.env.CLOUD_API_KEY ?? '',
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET ?? '',

  //Pagination Configuration
  DEFAULT_PER_PAGE:
    process.env.DEFAULT_PER_PAGE !== undefined ? parseInt(process.env.DEFAULT_PER_PAGE) : 20,

  //salt rounds for hashing
  SALT_ROUNDS: process.env.SALT_ROUNDS !== undefined ? parseInt(process.env.SALT_ROUNDS) : 10,
}
