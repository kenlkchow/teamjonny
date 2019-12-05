const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Location = require('../models/Location')
const User = require('../models/User')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err)
    db.dropDatabase()
      .then(() => {
        return User.create([{
          username: 'test',
          password: 'test',
          passwordConfirmation: 'test'
        }])
      })
      .then(users => {
        console.log(`${users.length} users created`)
        return Location.create([
          {
            name: 'test',
            address: 'test',
            category: 'test',
            website: 'test',
            priciness: 3,
            openLate: true,
            privacy: 1,
            notes: '',
            user: users[0]
          },
          {
            name: 'test2',
            address: 'test2',
            category: 'test2',
            website: 'test2',
            priciness: 2,
            openLate: true,
            privacy: 3,
            notes: 'qdkmldwmlqkm',
            user: users[0]
          },
          {
            name: 'test3',
            address: 'test3',
            category: 'test3',
            website: 'test3',
            priciness: 1,
            openLate: true,
            privacy: 2,
            notes: '',
            user: users[0]
          }
        ]
        )
      })
      .then(locations => console.log(`${locations.length} Locations created`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  }
)