const request = require('supertest')
const app = require('../src/app')

// describe('Test a maps path', () => {
//   test('It should respond with a 200', async () => {
//     const response = await request(app).get('/maps/333')
//     expect(response.statusCode).toBe(200)
//   })
// })

describe('Test a random path', () => {
  test('It should give a 404', async () => {
    const response = await request(app).get('/fishes')
    expect(response.statusCode).toBe(404)
  })
})
