/* global describe, beforeEach, afterEach, it, expect, api */

const Location = require('../../models/Location')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

describe('GET /locations', () => {

  let token1 = null
  let token2 = null
  let token3 = null
  
  beforeEach(done => {
    User.create([
      {
        username: 'ken',
        password: 'ken',
        passwordConfirmation: 'ken',
        circle: {
          approved: [],
          requested: []
        }
      },
      {
        username: 'jonny',
        password: 'jonny',
        passwordConfirmation: 'jonny',
        circle: {
          approved: [],
          requested: []
        }
      },
      {
        username: 'kathrin',
        password: 'kathrin',
        passwordConfirmation: 'kathrin',
        circle: {
          approved: [],
          requested: []
        }
      }
    ])
      .then(users => {
        token1 = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '12h' })
        token2 = jwt.sign({ sub: users[1]._id }, secret, { expiresIn: '12h' })
        token3 = jwt.sign({ sub: users[2]._id }, secret, { expiresIn: '12h' })
        return users
      })
      .then(users => {
        users[0].circle.approved.push(users[1]._id)
        users[1].circle.approved.push(users[0]._id)
        users[0].save()
        users[1].save()
        return users
      })
      .then(users => {
        Location.create([
          {
            name: 'location A',
            postcode: 'E20 1HR',
            category: 'wild',
            website: 'test',
            priciness: 3,
            openLate: true,
            privacy: 1,
            notes: '',
            user: users[0]
          },
          {
            name: 'location B',
            postcode: 'E20 1HR',
            category: 'wild',
            website: 'test',
            priciness: 3,
            openLate: true,
            privacy: 2,
            notes: '',
            user: users[0]
          },
          {
            name: 'location C',
            postcode: 'EC1Y 1HQ',
            category: 'Bistro/Brunch',
            website: 'https://www.lantanacafe.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 3,
            notes: '',
            user: users[0]
          },
          {
            name: 'location D',
            postcode: 'SW1X 0BP',
            category: 'Bistro/Brunch',
            website: 'https://grangerandco.com',
            priciness: 2,
            openLate: false,
            privacy: 2,
            notes: '',
            user: users[1]
          }, 
          {
            name: 'location E',
            postcode: 'SE1 9JH',
            category: 'Pub',
            website: 'https://foundersarms.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 1,
            notes: '',
            user: users[1]
          },
          {
            name: 'location F',
            postcode: 'W1 8AH',
            category: 'Pub',
            website: 'https://www.marketplace-london.com',
            priciness: 2,
            openLate: true,
            privacy: 3,
            notes: '',
            user: users[1]
          }
        ])
      })
      .then(() => {
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Location.deleteMany())
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api
      .get('/api/locations')
      .set('Authorization', `Bearer ${token1}`)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', done => {
    api
      .get('/api/locations')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('Ken should return 5 locations', done => {
    api
      .get('/api/locations/available')
      .set('Authorization', `Bearer ${token1}`)
      .end((err, res) => {
        console.log(res.body)
        expect(res.body.length).to.eq(5)
        done()
      })
  })

  it('Kathrin should return 2 locations', done => {
    api
      .get('/api/locations/available')
      .set('Authorization', `Bearer ${token3}`)
      .end((err, res) => {
        console.log(res.body)
        expect(res.body.length).to.eq(2)
        done()
      })
  })

})

