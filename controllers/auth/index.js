const authService = require('../../services/auth')
const { to } = require('../../util/error-handler')
const { successResponse, errorResponse } = require('../../util/responses')
const authValidations = require('../../validations/auth')

module.exports = {
  me: async (req, res) => {
    const { user } = req
    const [err, data] = await to(authService.me(user.id))
    if (err) return errorResponse(res, err.message, 400)

    return successResponse(res, data)
  },
  authenticate: async (req, res) => {
    const { body } = req
    const { error } = authValidations.validateLogin(body)
    if (error) return errorResponse(res, error.details[0].message, 400)

    const [err, data] = await to(authService.authenticate(body))
    if (err) return errorResponse(res, err.message, 400)

    return successResponse(res, data, 'Login successfully')
  },
}
