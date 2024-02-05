const { NODE_ENV } = require('../../config/app')

class RepositoryResponse {
  _error
  _response
  constructor() {
    this._error = false
    this._response = false
  }

  setError(err) {
    if (NODE_ENV !== 'production') this._error = err.message
    else this._error = 'Some thing went wrong'

    throw new Error(this._error)
  }

  setResponse(response) {
    this._response = response
    this._error = false
  }

  getResponses() {
    return this._response
  }
}

class BaseRepository extends RepositoryResponse {
  _model
  _transaction

  constructor(model) {
    super()
    this._model = model
    this._transaction = false
  }

  setTransaction(transaction) {
    this._transaction = transaction
    return this
  }

  async run(promise, shouldReturn = false) {
    try {
      const resp = await promise()
      if (!shouldReturn) this.setResponse(resp)
      else return resp
    } catch (error) {
      this.setError(error)
    }
  }

  async create(data) {
    await this.run(
      async () =>
        await this._model.create(data, this._transaction ? { transaction: this._transaction } : {})
    )
  }
  async findOne(attributes = {}) {
    await this.run(async () => await this._model.findOne(attributes))
  }
  async findAll(attributes = {}) {
    await this.run(async () => await this._model.findAll(attributes))
  }
  async update(attributes = { where: { id: 0 } }, data) {
    let attr = this._transaction ? { ...attributes, transaction: this._transaction } : attributes
    await this.run(async () => await this._model.update(data, attr))
  }
  async delete(attributes = { where: { id: 0 } }) {
    let attr = this._transaction ? { ...attributes, transaction: this._transaction } : attributes
    await this.run(async () => await this._model.destroy(attr))
  }
  async count(attributes = {}) {
    await this.run(async () => await this._model.count(attributes))
  }
  async paginate(pageNumber, pageSize, attributes = {}) {
    const offset = (pageNumber - 1) * pageSize
    const { count, rows } = await this.run(
      async () =>
        await this._model.findAndCountAll({
          offset: Math.max(offset, 0),
          limit: pageSize,
          ...attributes,
        }),
      true
    )
    const totalPages = Math.ceil(count / pageSize)
    this.setResponse({
      rows,
      totalCount: count,
      totalPages,
      currentPage: pageNumber,
    })
  }
}

module.exports = BaseRepository
