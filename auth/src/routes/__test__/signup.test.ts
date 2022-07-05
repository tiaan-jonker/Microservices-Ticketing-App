import request from 'supertest'
import { server } from '../../app'

it('returns 201 on successful signup', async () => {
  const api = '/api/users/signup'
  return request(server)
    .post(api)
    .send({
      email: 'joedirt@test.com',
      password: 'password',
    })
    .expect(201)
})

it('returns a 400 with an invalid email', async () => {
  const api = '/api/users/signup'
  return request(server)
    .post(api)
    .send({
      email: 'joedirttest.com',
      password: 'password',
    })
    .expect(400)
})

it('returns a 400 with an invalid password', async () => {
  const api = '/api/users/signup'
  return request(server)
    .post(api)
    .send({
      email: 'joedirt@test.com',
      password: 'p',
    })
    .expect(400)
})

it('returns a 400 with missing email and password', async () => {
  const api = '/api/users/signup'
  await request(server)
    .post(api)
    .send({
      email: 'joedirt@test.com',
    })
    .expect(400)

  await request(server)
    .post(api)
    .send({
      password: '1234567',
    })
    .expect(400)
})

it('disallows duplicate emails', async () => {
  const api = '/api/users/signup'
  await request(server)
    .post(api)
    .send({
      email: 'joedirt@test.com',
      password: 'password',
    })
    .expect(201)

  await request(server)
    .post(api)
    .send({
      email: 'joedirt@test.com',
      password: 'password',
    })
    .expect(400)
})
