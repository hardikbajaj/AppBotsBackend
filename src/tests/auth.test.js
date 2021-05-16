const request =  require('supertest')
// const jestConfig = require('../../jest.config')
const app = require('../app')
const User = require('../modals/user')
const Admin = require('../modals/admin')
const {permanentUser, testUser} = require('./constants')

beforeEach( async () => {
    await User.deleteOne({email:testUser.email})
    await Admin.deleteOne({email:testUser.email})
})

test('Should Sign Up The user', async () => {
    await request(app).post('/api/v1/user/signup')
    .send(
        testUser
    ).expect(201)
})

test('Should Log In The user', async () => {
    await request(app).post('/api/v1/user/signin')
    .send(
        permanentUser
    ).expect(200)
})

test('Should Sign Up The Admin', async () => {
    await request(app).post('/api/v1/admin/signup')
    .send(
        testUser
    ).expect(201)
})

test('Should Log In The Admin', async () => {
    await request(app).post('/api/v1/admin/signin')
    .send(
        permanentUser
    ).expect(200)
})