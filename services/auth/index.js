const bcrypt = require('bcryptjs')
const db = require('../../models')
const { generateJWT } = require('../../util/generate-jwt')

module.exports = {
  me: async userid => {
    let user = await db.User.findOne({
      where: { id: userid },
      attributes: {
        include: [[db.sequelize.fn('COUNT', db.sequelize.col('Posts.id')), 'postCount']],
        exclude: ['password'],
      },
      include: [
        {
          model: db.Post,
          attributes: [],
        },
      ],
      group: ['User.id'],
    })

    if (!user) throw new Error('User not exsists')

    return user
  },
  authenticate: async body => {
    const { email, password } = body
    let user = await db.User.findOne({ where: { email } })

    if (!user) throw new Error('Wrong email or password')

    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) {
      throw new Error('Wrong email or password')
    }
    user = JSON.parse(JSON.stringify(user))
    delete user['password']
    const jwtPayload = { ...user }
    const authToken = generateJWT(jwtPayload)
    user['authToken'] = authToken
    return user
  },
  signUp: async body => {
    const t = await db.sequelize.transaction()
    try {
      const { firstName, lastName, email, password } = body
      let userExistByEmail = await db.User.findOne({
        where: { email },
      })
      if (userExistByEmail) throw new Error('An account using this email already exists')

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      let userCreated = await db.User.create(
        {
          email,
          password: hashedPassword,
          firstName,
          lastName,
        },
        { transaction: t }
      )

      await t.commit()

      userCreated = JSON.parse(JSON.stringify(userCreated))
      delete userCreated.password
      const authToken = generateJWT(userCreated)
      userCreated['authToken'] = authToken

      return userCreated
    } catch (e) {
      await t.rollback()
      throw new Error(e.message)
    }
  },
}
