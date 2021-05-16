const request =  require('supertest')
const app = require('../app')
const User = require('../modals/user')
const Admin = require('../modals/admin')
const Area = require('../modals/area')
const {permanentUser,  testArea} = require('./constants')

let token;

beforeAll(  (done) => {

    request(app).post('/api/v1/user/signin').send(
        permanentUser
    ).end( (err, res) => {

        if(res){
            token = res.body.data.token
        }
        done();
    })
})

test('Should get All the Areas Information', async () => {
    await request(app).get('/api/v1/user/area')
    .set(
        'Authorization', `token ${token}`
    )
    .expect(200)
})

test('Should get bulb details by area ID', async () => {
    await request(app).get(`/api/v1/user/bulbs/area/60a142ab931e53c71477bfd6`)
    .set(
        'Authorization', `token ${token}`
    )
    .expect(200)
})

test('Should request change status of bulb', async () => {
    await request(app).post(`/api/v1/user/request/bulb`)
    .set(
        'Authorization', `token ${token}`
    )
    .send(
        {
            "bulbId": "60a142d725f5f4c8baa57ea5",
            "status" : false
        }
    )
    .expect(201)
})