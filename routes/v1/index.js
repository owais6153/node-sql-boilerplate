const router = require('express').Router()
const authRoutes = require('@routes/v1/auth')

router.use(`/auth`, authRoutes)

module.exports = router
