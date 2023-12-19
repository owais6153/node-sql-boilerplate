const router = require('express').Router()
const authController = require('../../controllers/auth')
const isAuthenticated = require('../../middleware/auth')

router.post('/authenticate', authController.authenticate)
router.get('/me', isAuthenticated, authController.me)

module.exports = router
