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

  async create(data) {
    try {
      const entity = await this._model.create(
        data,
        this._transaction ? { transaction: this._transaction } : {}
      )
      this.setResponse(entity)
    } catch (error) {
      this.setError(error)
    }
  }
  async findOne(attributes = {}) {
    try {
      const entity = await this._model.findOne(attributes)
      this.setResponse(entity)
    } catch (error) {
      this.setError(error)
    }
  }
  async findAll(attributes = {}) {
    try {
      const entities = await this._model.findAll(attributes)
      this.setResponse(entities)
    } catch (error) {
      this.setError(error)
    }
  }
  async update(attributes = { id: 0 }, data) {
    try {
      const entities = await this._model.update(data, attributes)
      this.setResponse(entities)
    } catch (error) {
      this.setError(error)
    }
  }
  async delete(attributes = { id: 0 }) {
    try {
      const res = await this._model.destroy(attributes)
      this.setResponse(res)
    } catch (error) {
      this.setError(error)
    }
  }
  async count(attributes = {}) {
    try {
      const res = await this._model.count(attributes)
      this.setResponse(res)
    } catch (error) {
      this.setError(error)
    }
  }
  async paginate(pageNumber, pageSize, attributes = {}) {
    try {
      const offset = (pageNumber - 1) * pageSize

      const { count, rows } = await this._model.findAndCountAll({
        offset: Math.max(offset, 0),
        limit: pageSize,
        ...attributes,
      })

      const totalPages = Math.ceil(count / pageSize)

      this.setResponse({
        rows,
        totalCount: count,
        totalPages,
        currentPage: pageNumber,
      })
    } catch (error) {
      this.setError(error)
    }
  }
}

module.exports = BaseRepository
