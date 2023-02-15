const request = require('supertest');
const app = require('../../app')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

const REQ = request(app)

describe('Launches API', ()=>{
    beforeAll(async()=>{
        await mongoConnect();
    })

    afterAll(async()=>{
        await mongoDisconnect();
    })

    describe('Test GET /launches', () =>{
        test('It should respond with 200 success', async() => {
            const response = await REQ
            .get('/v1/launches')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200);
        })
    })
    
    describe('Test POST /launch', () => {
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: "NCC 1701-D",
            target: "Kepler-1649 b",
            launchDate: "April 13, 2030"
        }
    
        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: "NCC 1701-D",
            target: "Kepler-1649 b",
        }
    
        test('It Should respond with 201 created', async() => {
            const response = await REQ
            .post('/v1/launches')
            .send(completeLaunchData)
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(201);
    
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate)
    
            expect(response.body).toMatchObject(launchDataWithoutDate)
        })
        test("It should catch missing requirement properties",async()=>{
            const response = await REQ
            .post('/v1/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(400);
    
            expect(response.body).toStrictEqual({error:"missing parameters"})
        })
        test("It should catch invalid dates",async()=>{
            const invalidDateLaunch = {...launchDataWithoutDate, launchDate: "test"}
            const response = await REQ
            .post('/v1/launches')
            .send(invalidDateLaunch)
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(400);
    
            expect(response.body).toStrictEqual({error:"Invalid Launch Date"})
        })
    })
})


