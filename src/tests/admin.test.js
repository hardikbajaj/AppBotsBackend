const request =  require('supertest')
const app = require('../app')
const User = require('../modals/user')
const Admin = require('../modals/admin')
const Area = require('../modals/area')
const {permanentUser,  testArea} = require('./constants')

let token;

beforeAll(  (done) => {

    request(app).post('/api/v1/admin/signin').send(
        permanentUser
    ).end( (err, res) => {

        if(res){
            token = res.body.data.token
        }
        done();
    })
})

afterEach( async () => {
    await Area.deleteOne({name: testArea.name})
})

test('Should Add New Area to DataBase', async () => {
    await request(app).post('/api/v1/admin/area')
    .set(
        'Authorization', `token ${token}`
    )
    .send(
        testArea
    ).expect(200)
})

test('Should Add Bulbs to the area', async () => {
    await request(app).post('/api/v1/admin/bulbs/add')
    .set(
        'Authorization', `token ${token}`
    )
    .send(
        {
            "count": 4,
            "areaId":"60a142ab931e53c71477bfd6"
        }
    ).expect(200)
})

test('Should Add People to the area', async () => {
    await request(app).post('/api/v1/admin/people/add')
    .set(
        'Authorization', `token ${token}`
    )
    .send(
        {
            "peopleCount":[0,8,8,9,5,8,5,3,6,9],
              "areaId":"60a142ab931e53c71477bfd6"
          }
    ).expect(200)
})

test('Should get All the Areas Information', async () => {
    await request(app).get('/api/v1/admin/area')
    .set(
        'Authorization', `token ${token}`
    )
    .expect(200)
})

test('Should reset Bulbs on the basis of frequency', async () => {
    await request(app).post('/api/v1/admin/reset/bulb')
    .set(
        'Authorization', `token ${token}`
    )
    .expect(200)
})

test('Should update the bulb status', async () => {
    await request(app).post('/api/v1/admin/set/bulb')
    .set(
        'Authorization', `token ${token}`
    )
    .send(
        {
            "bulbId": "60a142d725f5f4c8baa57ea2",
            "status" : true
        }
    )
    .expect(201)
})

test('Should get bulb details by area ID', async () => {
    await request(app).get(`/api/v1/admin/bulbs/area/60a142ab931e53c71477bfd6`)
    .set(
        'Authorization', `token ${token}`
    )
    .expect(200)
})