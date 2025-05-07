import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { EnvironmentConfiguration } from './env.config'
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: EnvironmentConfiguration.DATABASE_HOST,
  url: EnvironmentConfiguration.DATABASE_URL,
  port: Number(EnvironmentConfiguration.DATABASE_PORT),
  username: EnvironmentConfiguration.DATABASE_USERNAME,
  password: EnvironmentConfiguration.DATABASE_PASSWORD,
  database: EnvironmentConfiguration.DATABASE_NAME,
  entities: [__dirname + '/../entities/*/**.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
  dropSchema: false,
  ssl: {
    rejectUnauthorized: false,  
  },
})
