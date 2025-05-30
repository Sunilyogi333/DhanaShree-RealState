export interface IEnvironmentConfiguration {
  NODE_ENV: string
  APP_NAME: string
  PORT: number
  BASE_URL: string
  CLIENT_URL: string

  //Database Configuration
  DATABASE_HOST: string
  DATABASE_PORT: number
  DATABASE_USERNAME: string
  DATABASE_PASSWORD: string
  DATABASE_NAME: string
  DATABASE_URL: string

  FRONTEND_URL: string
  FRONTEND_URL_LOCAL: string

  ADMIN_EMAIL: string
  ADMIN_PASSWORD: string

  //JWT Configuration
  ACCESS_TOKEN_SECRET: string
  ACCESS_TOKEN_EXPIRES_IN: string
  REFRESH_TOKEN_SECRET: string
  REFRESH_TOKEN_EXPIRES_IN: string
  FORGET_PASSWORD_SECRET: string
  FORGET_PASSWORD_EXPIRES_IN: string

  //Verification Token
  VERIFICATION_TOKEN_SECRET: string
  VERIFICATION_TOKEN_EXPIRES_IN: string

  //Google Configuration
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  CALLBACK_URL: string
  GOOGLE_REFRESH_TOKEN: string
  GOOGLE_ACCESS_TOKEN: string

  //Email Information
  MAIL_HOST: string
  MAIL_AUTH: string
  MAIL_PASSWORD: string
  MAIL_PORT: string
  MAIL_USERNAME: string
  MAIL_FROM: string

  //Cloudinary Configuration
  CLOUD_NAME: string
  CLOUD_API_KEY: string
  CLOUD_API_SECRET: string

  //Pagination Configuration
  DEFAULT_PER_PAGE: number

  //salt rounds for hashing
  SALT_ROUNDS: number
}
