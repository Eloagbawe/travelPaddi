require("dotenv").config()
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('sekret', salt)
    const userDetails = {username: 'root', email: 'root@gmail.com', password: hashedPassword, phone: 81234,
    status: 'active'}
    const user = new User(userDetails)
    await user.save()
  })

  test('creation succeeds with new user details', async () => {
    let usersAtStart = await User.find({});
    usersAtStart = usersAtStart.map(u => u.toJSON());
    expect(usersAtStart).toHaveLength(1)

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('sekret', salt)
    const newUser = {username: 'janedoe', email: 'janedoe@gmail.com',
    password: hashedPassword, phone: 98765, status: 'active'}

    await api
    .post('/api/v1/users/create_account')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    let usersAtEnd = await User.find({})
    usersAtEnd = usersAtEnd.map(u => u.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContainEqual(newUser.username)
  })

  test('creation fails with an existing username', async () => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('sekret', salt)
    const newUser = {username: 'root', email: 'root@gmail.com',
    password: hashedPassword, phone: 81234, status: 'active'}

    await api
    .post('/api/v1/users/create_account')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  })

  test('creation fails with incomplete data', async () => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('sekret', salt)
    const newUser = {username: 'guest', password: hashedPassword,
    phone: 81234, status: 'active'}

    await api
    .post('/api/v1/users/create_account')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
