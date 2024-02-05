const BaseRepository = require('../base')
const { User } = require('../../models')

class UserRepository extends BaseRepository {
  constructor() {
    super(User)
  }
  async findByEmail(email, attributes = {}) {
    await this.findOne({
      where: { email },
      ...attributes,
    })
  }
  async findByID(id, attributes = {}) {
    await this.findOne({
      where: { id },
      ...attributes,
    })
  }
}

module.exports = UserRepository
