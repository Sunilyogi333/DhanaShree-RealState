import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { EnvironmentConfiguration } from './env.config'
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: EnvironmentConfiguration.DATABASE_URL,
  entities: [__dirname + '/../entities/*/**.entity{.ts,.js}'],
  migrations: ['src/migration/**/*.js'],
  synchronize: false,
  logging: false,
  dropSchema: false,
  ssl: {
    rejectUnauthorized: false,
  },
})
