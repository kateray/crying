const app = require('../app')
const request = require('supertest')(app)
const login = require('./login')

const createAuthenticatedRequest = (loginDetails, done) => {
  let authenticatedRequest = request.agent()
  authenticatedRequest
    .post('/login')
    .send(loginDetails)
    .end( (error, response) => {
      if (error) {
          throw error;
      }
      done(authenticatedRequest)
    })
}

describe('Test updating user', () => {
  // test('It should give a 403 if not logged in', async () => {
  //   const response = await request(app).put('/user/43laer4')
  //   expect(response.statusCode).toBe(403)
  // })
  test('It should give a 403 if not correct user', async () => {
    let agent = await login.login(request)
    console.log(agent)
    let req = request.put('/user/43laer4')
    agent.attachCookies(req)
    const response = await req
    expect(response.statusCode).toBe(403)
  })
})
