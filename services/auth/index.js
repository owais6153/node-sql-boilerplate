const bcrypt = require('bcryptjs')
const { sequelize, Post } = require('../../models')

const UserRepository = require('../../repositories/user')
const { generateJWT } = require('../../util/generate-jwt')

module.exports = {
  me: async userid => {
    const userRepo = new UserRepository()

    await userRepo.findByID(userid, {
      attributes: {
        include: [[sequelize.fn('COUNT', sequelize.col('Posts.id')), 'postCount']],
        exclude: ['password'],
      },
      include: [
        {
          model: Post,
          attributes: [],
        },
      ],
      group: ['User.id'],
    })

    let user = userRepo.getResponses()
    if (!user) throw new Error('User not exsists')

    return user
  },
  authenticate: async body => {
    const { email, password } = body
    const userRepo = new UserRepository()

    await userRepo.findByEmail(email)

    let user = userRepo.getResponses()
    if (!user) throw new Error('Wrong email or password')

    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) {
      throw new Error('Wrong email or password')
    }
    user = JSON.parse(JSON.stringify(user))
    delete user['password']
    const jwtPayload = { ...user }
    const authToken = generateJWT(jwtPayload)
    user['x-auth-token'] = authToken
    return user
  },
  signUp: async body => {
    const t = await sequelize.transaction()
    const { firstName, lastName, email, password } = body
    const userRepo = new UserRepository()

    await userRepo.findByEmail(email)

    let userExistByEmail = userRepo.getResponses()
    if (userExistByEmail) throw new Error('An account using this email already exists')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
      await userRepo.setTransaction(t).create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      })

      let userCreated = userRepo.getResponses()

      userCreated = JSON.parse(JSON.stringify(userCreated))
      await t.commit()

      delete userCreated.password
      const authToken = generateJWT(userCreated)
      userCreated['x-auth-token'] = authToken

      return userCreated
    } catch (e) {
      await t.rollback()
      throw new Error(e.message)
    }
  },
}
