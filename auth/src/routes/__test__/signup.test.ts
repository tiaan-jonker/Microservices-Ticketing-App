import request from 'supertest'
import { app } from '../../app'

it('returns 201 on successful signup', async () => {
  const api = '/api/users/signup'
  return request(app)
    .post(api)
    .send({
      email: 'joedirt@test.com',
      password: 'password',
    })
    .expect(201)
})
