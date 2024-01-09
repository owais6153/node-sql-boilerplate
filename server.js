const config = require('./config/app')
const app = require('./app')

const { PORT, JWT_SECRET_KEY, NODE_ENV } = config

// Serve
app.listen(PORT, function () {
  console.log(`Server listning to PORT: ${PORT}, Enviroment: ${NODE_ENV}`)
})

if (!JWT_SECRET_KEY) {
  console.error('FATAL ERROR: JWT_SECRET_KEY is not defined.')
  process.exit(1)
}
