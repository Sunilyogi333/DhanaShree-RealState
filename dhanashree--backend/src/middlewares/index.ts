import express, { Application } from 'express'
import compression from 'compression'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from '../routes'
import morgan from 'morgan'
import { rateLimiter } from '../utils/rateLimiter.utils'
import { EnvironmentConfiguration } from '../config/env.config'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from '../swagger'
import errorHandler from './error.middleware'
import { ErrorRequestHandler } from 'express'

const middleware = (app: Application) => {
  app.use(compression())
  // app.use(
  //   cors({
  //     origin: true, // Replace with your frontend's URL
  //     credentials: true, // Allow cookies and other credentials
  //   })
  // )
  app.use(
    cors({
      origin: [
        EnvironmentConfiguration.FRONTEND_URL,
        'http://localhost:4005',
        'http://localhost:3000',
        'https://dhanashree-realstate.onrender.com',
      ],
      credentials: true,
    })
  )
  console.log('CORS enabled for:', EnvironmentConfiguration.FRONTEND_URL)
  app.use(cookieParser())

  // Set payload size limits
  app.use(express.json({ limit: '20mb' })) // Adjust JSON payload size limit to 20 MB
  app.use(express.urlencoded({ extended: true, limit: '20mb' })) // Adjust URL-encoded payload size limit to 20 MB

  app.use(rateLimiter)
  app.use(morgan('dev'))
  app.use('/api', router)
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

  console.log('Environment:', EnvironmentConfiguration.NODE_ENV)

  app.use(errorHandler as ErrorRequestHandler)
}

export default middleware
