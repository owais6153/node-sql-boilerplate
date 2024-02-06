require('module-alias/register')
const config = require('@config/app')
const app = require('@root/app')
const { sequelize } = require('@models/')

const { PORT, JWT_SECRET_KEY, NODE_ENV } = config

// Serve
app.listen(PORT, async function () {
  console.log(`Server listning to PORT: ${PORT}, Enviroment: ${NODE_ENV}`)
  try {
    await sequelize.authenticate()
  } catch (err) {
    console.error('Unable to connect to the database:', err)
    process.exit(1)
  }
})

if (!JWT_SECRET_KEY) {
  console.error('FATAL ERROR: JWT_SECRET_KEY is not defined.')
  process.exit(1)
}
