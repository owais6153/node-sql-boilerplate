const BaseRepository = require('@repositories/base')
const { Post } = require('@models/')

class PostRepository extends BaseRepository {
  constructor() {
    super(Post)
  }
  async findByAuthorId(authorId) {
    await this.findOne({
      where: { userId: authorId },
    })
  }
}

module.exports = PostRepository
