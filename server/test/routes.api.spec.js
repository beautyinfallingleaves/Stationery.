const request = require('supertest')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const app = require('../app')

describe('API Routes', function() {
  describe('POST /api/email', function() {
    it('requires the request body to contain a recipient, front image, and back image', async function() {
      await request(app)
      .post('/api/email')
      .send({})
      .expect(500)
    })

    it('returns 201 OK if send is successful', async function() {
      await request(app)
        .post('/api/email')
        .send({
          recipient: 'no-reply@test.com',
          frontImageFirebaseUrl: 'test',
          backImageFirebaseUrl: 'test',
        })
        .expect(202)
    })
  })
})
