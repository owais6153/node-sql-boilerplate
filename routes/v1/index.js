const router = require('express').Router()
const authRoutes = require('./auth')
const { templateIDs } = require('../../config/sendgrid')
const sendMail = require('../../util/sendgrid-mail')

router.use(`/auth`, authRoutes)

router.get('/test-mail', async (req, res) => {
  try {
    await sendMail(
      templateIDs.welcome,
      'owais6153@gmail.com',
      'Test Welocme Email',
      {
        nickname: 'Developer',
      },
      true
    )
    res.status(200).send({
      status: 200,
      data: {
        message: 'Email Sent',
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
