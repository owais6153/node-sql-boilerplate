const jsonwebtoken = require('jsonwebtoken')
module.exports.generateJWT = payload => {
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY, {})
}
