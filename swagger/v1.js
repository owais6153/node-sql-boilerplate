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
  apis: ['./routes/v1/auth.js'],
}

module.exports.swagger_v1 = swaggerJsDoc(options)