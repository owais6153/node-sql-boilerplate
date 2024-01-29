const router = require('express').Router()
const authRoutes = require('./auth')
const twilio = require('../../util/twilio')

router.use(`/auth`, authRoutes)

//Send Mssage with Twilio
router.get('/test-message', async (req, res) => {
  try {
    await twilio.sendSMS('923410216406', 'Test Twilio', true)
    res.status(200).send({
      status: 200,
      data: {
        message: 'Message Sent',
      },
    })
  } catch (e) {
    res.status(500).send({
      status: 500,
      error: e.message || 'Something went wrong',
    })
  }
})

module.exports = router
