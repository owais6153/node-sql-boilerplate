const router = require('express').Router()
const authRoutes = require('./auth')
const twilio = require('../../util/twilio')

router.use(`/auth`, authRoutes)

//Send Mssage with Twilio
router.get('/send-message', (req, res) => {
  twilio.sendSMS('923410216406', 'Test Twilio')
})

module.exports = router
