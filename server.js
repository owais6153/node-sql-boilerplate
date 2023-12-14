const express = require('express')
const cors = require('cors')
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

app.get('/', function (req, res) {
  res.json({ msg: 'App is running' })
})

app.listen(PORT, function () {
  console.log(`Server listning to PORT: ${PORT}`)
})
