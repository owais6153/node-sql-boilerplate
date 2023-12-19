const authService = require('../../services/auth')
const { to } = require('../../util/error-handler')
const responses = require('../../util/responses')
const authValidations = require('../../validations/auth')

module.exports = {
  me: async (req, res) => {
    const { user } = req
    const [err, data] = await to(authService.me(user.id))
    if (err) return responses._400(res, err.message)

    return responses._200(res, data)
  },
  authenticate: async (req, res) => {
    const { body } = req
    const { error } = authValidations.validateLogin(body)
    if (error) return responses._400(res, error.details[0].message)

    const [err, data] = await to(authService.authenticate(body))
    if (err) return responses._400(res, err.message)

    return responses._200(res, data, 'Login successfully')
  },
}
