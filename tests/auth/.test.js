const request = require('supertest')
const app = require('../../app')
const { API_PREFIX } = require('../../config/app')
const { sequelize } = require('../../models')
const UserRepository = require('../../repositories/user')

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
  } catch (err) {
    console.error('Unable to connect to the database:', err)
    process.exit(1)
  }
})

describe(`POST ${baseRoute}/signup`, () => {
  it('Should return 400 for empty fields', () => {
    return request(app).post(`${baseRoute}/signup`).expect(400)
  })
  it('Should return 400 for missing fields', () => {
    return request(app)
      .post(`${baseRoute}/signup`)
      .send({
        email: data.email,
        password: data.password,
      })
      .expect(400)
  })
  it('Should return 400 for email already exsists', () => {
    return request(app)
      .post(`${baseRoute}/signup`)
      .send({
        email: 'admin@admin.com',
        password: data.password,
      })
      .expect(400)
  })
  it('Should return 200 with authToken after successful signup', async () => {
    const res = await request(app).post(`${baseRoute}/signup`).send(data)

    expect(res.statusCode).toBe(200)
    expect(res.body.data.email).toBe(data.email)
  })
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
  it('Should return 200 for correct email and password', async () => {
    const res = await request(app).post(`${baseRoute}/authenticate`).send({
      email: data.email,
      password: data.password,
    })
    authToken = res.body.data.authToken
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
      .set('x-auth-token', authToken + 'wrong')
      .expect(400)
  })
  it('Should return 200 for correct authToken', async () => {
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
