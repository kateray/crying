const request = require('supertest')
const app = require('../src/app')

describe('Test a random path', () => {
  test('It should give a 404', async () => {
    const response = await request(app).get('/fishes')
    expect(response.statusCode).toBe(404)
  })
})
