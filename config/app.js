require('dotenv').config()
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4000,
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
  SWAGGER_DOCS_URL: process.env.SWAGGER_DOCS_URL || '/docs/v1',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'example.com',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'JWTSECRETKEY',
}
