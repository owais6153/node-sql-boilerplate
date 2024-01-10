const request = require('supertest')
const app = require('../../../app')
const { API_PREFIX } = require('../../../config/app')
const { sequelize } = require('../../../models')
const UserRepository = require('../../../repositories/user')

const baseRoute = API_PREFIX + '/auth'

const data = {
  email: 'fakeemail@test.com',
  password: 'secret123',
  firstName: 'First',
  lastName: 'Last',
}

var authToken = ''

beforeAll(async () => {
  try {
    await sequelize.authenticate()
    const res = await request(app).post(`${baseRoute}/signup`).send(data)
    authToken = res?.body?.data?.email
  } catch (err) {
    console.error('Unable to connect to the database:', err)
    process.exit(1)
  }
})

describe(`POST ${baseRoute}/authenticate`, () => {
  it('Should return 400 for empty email or password', () => {
    return request(app).post(`${baseRoute}/authenticate`).expect(400)
  })
  it('Should return 400 for wrong email or password', () => {
    return request(app)
      .post(`${baseRoute}/authenticate`)
      .send({
        email: 'wrongemail@test.com',
        password: 'secret123',
      })
      .expect(400)
  })
  it('Should return 200 user object for correct email and password', async () => {
    const res = await request(app).post(`${baseRoute}/authenticate`).send({
      email: data.email,
      password: data.password,
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.data.email).toBe(data.email)
  })
})

describe(`GET ${baseRoute}/me`, () => {
  it('Should return 400 for unauthorized request', () => {
    return request(app).get(`${baseRoute}/me`).expect(400)
  })
  it('Should return 400 for invalid authToken', () => {
    return request(app)
      .get(`${baseRoute}/me`)
      .send({
        email: 'wrongemail@test.com',
        password: 'secret123',
      })
      .set('x-auth-token', authToken + 'invalid')
      .expect(400)
  })
  it('Should return 200 and user object', async () => {
    const res = await request(app)
      .get(`${baseRoute}/me`)
      .send({
        email: data.email,
        password: data.password,
      })
      .set('x-auth-token', authToken)

    expect(res.statusCode).toBe(200)
    expect(res.body.data.email).toBe(data.email)
  })
})

afterAll(async () => {
  const userRepo = new UserRepository()
  await userRepo.delete({ where: { email: data.email } })
})
