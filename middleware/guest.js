const { errorResponse } = require('@util/responses')

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token')
  if (!token) next()
  else return errorResponse(res, 'Already Authenticated', 406)
}
