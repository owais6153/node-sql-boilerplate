const request = require('supertest')
const { API_PREFIX } = require('../../../config/app')
const app = require('../../../app')

describe(`POST ${API_PREFIX}/test-message`, () => {
  it('Should return 200 for successfull message sent', () => {
    return request(app).get(`${API_PREFIX}/test-message`).expect(200)
  })
})
