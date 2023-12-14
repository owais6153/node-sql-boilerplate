const express = require('express')
const cors = require('cors')
const mainRoutes = require('./routes/v1/main')

const path = require('path')
const app = express()

const PORT = process.env.PORT || 4000
const CORS_ORIGIN = process.env.CORS_ORIGIN

app.use(
  cors({
    origin: CORS_ORIGIN,
  })
)
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/', mainRoutes)

app.listen(PORT, function () {
  console.log(`Server listning to PORT: ${PORT}`)
})
