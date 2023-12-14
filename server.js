require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const v1 = require('./routes/v1')

const PORT = process.env.PORT || 4000
const CORS_ORIGIN = process.env.CORS_ORIGIN

const app = express()
app.use(
  cors({
    origin: CORS_ORIGIN,
  })
)
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/api/v1/', v1)

app.listen(PORT, function () {
  console.log(`Server listning to PORT: ${PORT}`)
})
