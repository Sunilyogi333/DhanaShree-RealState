import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'DhanaShree API',
    version: '1.0.0',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token. Example: Bearer <your-token>',
      },
    },
  },
  servers: [
    {
      url: 'http://localhost:4005/api/',
      description: 'Development server',
    },
    {
      url: 'https://dhanashree-realstate.onrender.com/api/',
      description: 'Production server',
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['src/swagger/**/*.yaml'],
  schemas: ['src/swagger/components/schemas.yaml'],
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec
