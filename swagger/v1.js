const swaggerJsDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Docs',
      version: '1.0.0',
      description: 'Api documentation',
    },
  },
  apis: ['./routes/v1/swagger-test-route.js'],
}

module.exports = swaggerJsDoc(options)
