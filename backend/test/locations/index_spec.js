/* global describe, beforeEach, afterEach, it, expect, api */

const Location = require('../../models/Location')
const User = require('../../models/User')

describe('GET /locations', () => {

  beforeEach(done => {
    User.create({
      username: 'Ken',
      password: 'ken',
      passwordConfirmation: 'ken'
    })
      .then(user => {
        Location.create([
          {
            name: 'back alley',
            address: 'E20 1HR',
            category: 'wild',
            website: 'test',
            priciness: 3,
            openLate: true,
            privacy: 1,
            notes: '',
            user
          },
          {
            name: 'test alley',
            address: 'E20 1HR',
            category: 'wild',
            website: 'test',
            priciness: 3,
            openLate: true,
            privacy: 1,
            notes: '',
            user
          }
        ])
          .then(() => done())
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Location.deleteMany())
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/locations')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', done => {
    api.get('/api/animals')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })
})