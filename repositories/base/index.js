const { NODE_ENV } = require('../../config/app')

class RepositoryResponse {
  _success
  _error
  _result
  constructor() {
    this._success = false
    this._error = false
    this._result = false
  }

  setError(err) {
    this._success = false
    if (NODE_ENV !== 'production') this._error = err.message
    else this.error = 'Some thing went wrong'
  }

  setResult(response) {
    this._result = response
    this._error = false
    this._success = true
  }

  getResponse() {
    return {
      success: this._success,
      error: this._error,
      result: this._result,
    }
  }

  isSuccess() {
    return this._success
  }

  getError() {
    return this._error
  }

  getResult() {
    return this._result
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
      const res = await this._model.create(
        data,
        this._transaction ? { transaction: this._transaction } : {}
      )
      this.setResult(res)
    } catch (error) {
      this.setError(error)
    }
  }
  async findOne(attributes = {}) {
    try {
      const res = await this._model.findOne(attributes)
      this.setResult(res)
    } catch (error) {
      this.setError(error)
    }
  }
  async findAll(attributes = {}) {
    try {
      const res = await this._model.findAll(attributes)
      this.setResult(res)
    } catch (error) {
      this.setError(error)
    }
  }
}

module.exports = BaseRepository
