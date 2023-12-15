require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const authRoutes = require('./routes/v1/auth')

const PORT = process.env.PORT || 4000
const CORS_ORIGIN = process.env.CORS_ORIGIN
const jwtSecretKey = process.env.JWT_SECRET_KEY

const app = express()

app.use(
  cors({
    origin: CORS_ORIGIN,
  })
)
app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(express.json())

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/api/v1/auth', authRoutes)

app.listen(PORT, function () {
  console.log(`Server listning to PORT: ${PORT}`)
})

if (!jwtSecretKey) {
  console.error('FATAL ERROR: jwtSecretKey is not defined.')
  process.exit(1)
}
