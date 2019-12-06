/* global describe, beforeEach, afterEach, it, expect, api */
const User = require('../../models/User')

const testUserCorrect = {
  username: 'Natasha',
  password: 'password',
  passwordConfirmation: 'password'
}

const testUserIncorrect = {
  username: 'Natasha',
  password: 'password',
  passwordConfirmation: 'notthepassword'
}

describe('POST /register', () => {
  afterEach(done => {
    User
      .deleteMany()
      .then(() => done())
  })

  it('should return status 200 if request is valid', done => {
    api
      .post('/api/register')
      .send(testUserCorrect)
      .expect(200)
      .end(() => done())
  })

  it('should return status 422 if password does not match', done => {
    api
      .post('/api/register')
      .send(testUserIncorrect)
      .expect(422)
      .end(() => done())
  })

})