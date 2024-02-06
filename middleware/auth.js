const jwt = require('jsonwebtoken')
const { errorResponse } = require('@util/responses')

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token')
  if (!token) {
    return errorResponse(res, 'Unauthorized Request', 401)
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    return errorResponse(res, 'Authorization code is invalid', 401)
  }
}
