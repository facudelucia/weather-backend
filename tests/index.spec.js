const request = require('supertest')
const app = require('../index.js')

describe('GET /v1/location', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/v1/location').send()
        expect(response.statusCode).toBe(200)
    })
    test('should have a city, lat and lon', async () => {
        const response = await request(app).get('/v1/location').send()
        expect(response.body.data.city).toBeDefined()
        expect(response.body.data.lat).toBeDefined()
        expect(response.body.data.lon).toBeDefined()
    })
})

describe('GET /v1/current', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/v1/current').send()
        expect(response.statusCode).toBe(200)
    })
    test('should have a temp and weather', async () => {
        const response = await request(app).get('/v1/current').send()
        expect(response.body.data.main.temp).toBeDefined()
        expect(response.body.data.weather[0].main).toBeDefined()
    })
})

describe('GET /v1/current/:city?', () => {
    test('given a city, should respond with a 200 status code', async () => {
        const response = await request(app).get('/v1/current/rosario').send()
        expect(response.statusCode).toBe(200)
    })
    test('given a city, should have a temp and weather', async () => {
        const response = await request(app).get('/v1/current/rosario').send()
        expect(response.body.data.main.temp).toBeDefined()
        expect(response.body.data.weather[0].main).toBeDefined()
    })
})

describe('GET /v1/forecast', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/v1/forecast').send()
        expect(response.statusCode).toBe(200)
    })

    test('should have a list', async () => {
        const response = await request(app).get('/v1/forecast').send()
        expect(response.body.data.list).toBeDefined()
    })

    test('list should contain weather, temp, and dt_txt', async () => {
        const response = await request(app).get('/v1/forecast').send()
        expect(response.body.data.list[0].main.temp).toBeDefined()
        expect(response.body.data.list[0].weather[0].main).toBeDefined()
        expect(response.body.data.list[0].dt_txt).toBeDefined()
    })
})

describe('GET /v1/forecast/:city?', () => {
    test('given a city, should respond with a 200 status code', async () => {
        const response = await request(app).get('/v1/forecast/rosario').send()
        expect(response.statusCode).toBe(200)
    })

    test('given a city, should have a list', async () => {
        const response = await request(app).get('/v1/forecast').send()
        expect(response.body.data.list).toBeDefined()
    })

    test('given a city, list should contain weather, temp, and dt_txt', async () => {
        const response = await request(app).get('/v1/forecast').send()
        expect(response.body.data.list[0].main.temp).toBeDefined()
        expect(response.body.data.list[0].weather[0].main).toBeDefined()
        expect(response.body.data.list[0].dt_txt).toBeDefined()
    })
}) 