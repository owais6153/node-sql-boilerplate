const request = require('supertest')
const app = require('@root/app')
const { API_PREFIX } = require('@config/app')
const { sequelize } = require('@models/')
const UserRepository = require('@repositories/user')

const baseRoute = API_PREFIX + '/auth'

const data = {
  email: 'fakeemail@test.com',
  password: 'secret123',
  firstName: 'First',
  lastName: 'Last',
}

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

afterAll(async () => {
  const userRepo = new UserRepository()
  await userRepo.delete({ where: { email: data.email } })
})
