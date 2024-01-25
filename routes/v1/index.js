const router = require('express').Router()
const authRoutes = require('./auth')
const swaggerRoutes = require('./swagger-test-route')

router.use(`/auth`, authRoutes)
router.use(`/swagger-test`, swaggerRoutes)

module.exports = router
