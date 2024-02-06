const router = require('express').Router()
const authController = require('@controllers/auth')
const isAuthenticated = require('@middleware/auth')
const isGuest = require('@middleware/guest')

router.post('/authenticate', isGuest, authController.authenticate)

router.post('/signup', isGuest, authController.signUp)

router.get('/me', isAuthenticated, authController.me)

module.exports = router
