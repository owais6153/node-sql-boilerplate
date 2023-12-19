require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const swaggerUI = require('swagger-ui-express')
const { swagger_v1 } = require('./swagger/v1')

const path = require('path')
const authRoutes = require('./routes/v1/auth')

const PORT = process.env.PORT || 4000
const CORS_ORIGIN = process.env.CORS_ORIGIN
const jwtSecretKey = process.env.JWT_SECRET_KEY

const app = express()

// CORS
app.use(
  cors({
    origin: CORS_ORIGIN,
  })
)
// Logging in terminal
app.use(morgan('dev'))
app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(express.json())

// Static Paths
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/api-docs/v1', swaggerUI.serve, swaggerUI.setup(swagger_v1))

// Routes
app.use('/api/v1/auth', authRoutes)

// Error boundary
app.use((err, req, res) => {
  res.status(500).send({
    status: 500,
    error: {
      message: 'Something Went Wrong',
    },
  })
})

// Serve
app.listen(PORT, function () {
  console.log(`Server listning to PORT: ${PORT}`)
})

if (!jwtSecretKey) {
  console.error('FATAL ERROR: jwtSecretKey is not defined.')
  process.exit(1)
}
