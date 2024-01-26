const config = require('./config/app')
const app = require('./app')
const { sequelize } = require('./models')
const { socketInit } = require('./config/socket')

const { PORT, JWT_SECRET_KEY, NODE_ENV } = config

// Serve
const server = app.listen(PORT, async function () {
  console.log(`Server listning to PORT: ${PORT}, Enviroment: ${NODE_ENV}`)
  try {
    await sequelize.authenticate()
    // Initialize Socket
    socketInit(server)
  } catch (err) {
    console.error('Unable to connect to the database:', err)
    process.exit(1)
  }
})

if (!JWT_SECRET_KEY) {
  console.error('FATAL ERROR: JWT_SECRET_KEY is not defined.')
  process.exit(1)
}
