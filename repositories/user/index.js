const BaseRepository = require('../base')
const { User } = require('../../models')

class UserRepository extends BaseRepository {
  constructor() {
    super(User)
  }
  async findByEmail(email) {
    await this.findOne({
      where: { email },
    })
  }
}

module.exports = UserRepository
