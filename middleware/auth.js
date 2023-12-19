const jwt = require('jsonwebtoken')
const response = require('../util/responses')

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token')
  if (!token) {
    return response._401(res, 'Unauthorized Request')
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    return response._401(res, 'Authorization code is invalid')
  }
}
