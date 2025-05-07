import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'DhanaShree API',
    version: '1.0.0',
  },
  components: {
    securitySchemes: {
      Authorization: {
        type: 'apiKey',
        in: 'header',
        description:
          'All requests to the API should contain an Authorization header with your API Token : NOTE [Add Bearer before token] ',
        name: 'Authorization',
      },
    },
  },
  servers: [
    {
      url: 'http://localhost:4005/api/',
      description: 'Development server',
    },
    {
      url: 'https://project-dhanashree-backend.onrender.com/api/',
      description: 'Production server',
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['src/swagger/**/*.yaml'],
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec
