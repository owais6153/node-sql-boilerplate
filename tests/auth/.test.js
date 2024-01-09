const request = require('supertest')
const app = require('../../app')
const { API_PREFIX } = require('../../config/app')

const baseRoute = API_PREFIX + '/auth/'

describe('POST /auth/authenticate', () => {
  it('Should return 400 for empty email or password', () => {
    return request(app).post(`${baseRoute}/authenticate`).expect(400)
  })
  it('Should return 400 for wrong email or password', () => {
    return request(app)
      .post(`${baseRoute}/authenticate`)
      .send({
        email: 'fake@admin.com',
        password: 'secret123',
      })
      .expect(400)
  })
  it('Should return 200 for correct email and password', async () => {
    const res = await request(app).post(`${baseRoute}/authenticate`).send({
      email: 'admin@admin.com',
      password: 'secret123',
    })

    expect(res.statusCode).toBe(200)
    expect(res.body.data.email).toBe('admin@admin.com')
  })
})
