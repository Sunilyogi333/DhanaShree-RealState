import express from 'express'
import 'reflect-metadata'
import { AppDataSource } from './config/database.config'
import { EnvironmentConfiguration } from './config/env.config'
import middleware from './middlewares'
import http from 'http'
const app = express()
const httpConnection = http.createServer(app)

async function bootStrap() {
  await AppDataSource.initialize()
  await middleware(app)

  httpConnection.listen(EnvironmentConfiguration.PORT, async () => {
    console.info(`Server started at http://localhost:${EnvironmentConfiguration.PORT}`)
  })
}
try {
  bootStrap()
} catch (error) {
  console.log(error)
  process.exit(1)
}
