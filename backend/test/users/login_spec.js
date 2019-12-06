/* global describe, beforeEach, afterEach, it, expect, api */
const User = require('../../models/User')

const testUserCorrect = {
  username: 'Lin-Manuel',
  password: 'cinnamonroll'
}

const testUserIncorrect = {
  username: 'Lin-Manuel',
  password: 'notacinnamonroll'
}

const testUserNotExisting = {
  username: 'natasha',
  password: 'somepassword'
}

describe('POST /login', () => {

  beforeEach(done => {
    User 
      .create({
        username: 'Lin-Manuel',
        password: 'cinnamonroll',
        passwordConfirmation: 'cinnamonroll'
      })
      .then(() => done())
  })

  afterEach(done => {
    User
      .deleteMany()
      .then(() => done())
  })

  it('should return status 202 and a token if login is valid', done => {
    api
      .post('/api/login')
      .send(testUserCorrect)
      .expect(202)
      .end((err, res) => {
        expect(res.body.token).to.be.a('string')
        done()
      })
  })

  it('should return status 401 if login is invalid', done => {
    api
      .post('/api/login')
      .send(testUserIncorrect)
      .expect(401)
      .end(() => done())
  })

  it('should return status 401 if user unknown', done => {
    api
      .post('/api/login')
      .send(testUserNotExisting)
      .expect(401)
      .end(() => done())
  })

})