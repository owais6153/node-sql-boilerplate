const request = require('supertest')
const { API_PREFIX } = require('../../../config/app')
const app = require('../../../app')

describe(`POST ${API_PREFIX}/test-sendgrid`, () => {
  it('Should return 200 for successfull mail sent', () => {
    return request(app).get(`${API_PREFIX}/test-sendgrid`).expect(200)
  })
})
