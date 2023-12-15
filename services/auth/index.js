const bcrypt = require('bcryptjs')
const db = require('../../models')
const { generateJWT } = require('../../util/generate-jwt')

module.exports = {
  authenticate: async body => {
    const { email, password } = body
    let user = await db.User.findOne({ where: { email } })

    if (!user) throw new Error('Wrong email or password')

    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) {
      throw new Error('Wrong email or password')
    }

    const jwtPayload = { id: user.id, email: user.email }
    user.authToken = generateJWT(jwtPayload)
    return user
  },
}
