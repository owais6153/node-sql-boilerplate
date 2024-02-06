const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const path = require('path')
const routes = require('@routes/v1')
const config = require('@config/app')

const { CORS_ORIGIN, NODE_ENV, API_PREFIX } = config

const app = express()

// CORS
app.use(
  cors({
    origin: CORS_ORIGIN,
  })
)
// Logging in terminal
if (NODE_ENV !== 'production') app.use(morgan('dev'))

app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(express.json())

// Static Paths
app.use('/public', express.static(path.join(__dirname, 'public')))

// Routes
app.use(`${API_PREFIX}`, routes)

// Error boundary
app.use((err, req, res, next) => {
  res.status(500).send({
    status: 500,
    error: {
      message: 'Something Went Wrong',
    },
  })
})

module.exports = app
