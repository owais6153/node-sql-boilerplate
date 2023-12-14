const router = require('express').Router()

router.get('/', function (req, res) {
  res.json({ msg: 'App is running' })
})

module.exports = router
