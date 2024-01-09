const bcrypt = require('bcryptjs')
const db = require('../../models')

const UserRepository = require('../../repositories/user')
const { generateJWT } = require('../../util/generate-jwt')

module.exports = {
  me: async userid => {
    const userRepo = new UserRepository()

    await userRepo.findOne({
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
    if (!userRepo.isSuccess()) throw new Error(!userRepo.getError())
    let user = userRepo.getResult()
    if (!user) throw new Error('User not exsists')

    return user
  },
  authenticate: async body => {
    const { email, password } = body
    const userRepo = new UserRepository()

    await userRepo.findByEmail(email)
    if (!userRepo.isSuccess()) throw new Error(!userRepo.getError())

    let user = userRepo.getResult()
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
      const userRepo = new UserRepository()

      await userRepo.findByEmail(email)
      if (!userRepo.isSuccess()) throw new Error(!userRepo.getError())

      let userExistByEmail = userRepo.getResult()
      if (userExistByEmail) throw new Error('An account using this email already exists')

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      await userRepo.setTransaction(t).create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      })
      if (!userRepo.isSuccess()) throw new Error(!userRepo.getError())
      let userCreated = userRepo.getResult()

      userCreated = JSON.parse(JSON.stringify(userCreated))
      await t.commit()

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
