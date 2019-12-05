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
          username: 'jonny',
          password: 'jonny',
          passwordConfirmation: 'jonny',
          circle: {
            approved: [],
            requested: []
          }
        },
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
          username: 'kathrin',
          password: 'kathrin',
          passwordConfirmation: 'kathrin',
          circle: {
            approved: [],
            requested: []
          }
        },
        {
          username: 'jessepinkman',
          password: 'church',
          passwordConfirmation: 'church',
          circle: {
            approved: [],
            requested: []
          }
        },
        {
          username: 'linmanuel',
          password: 'cinnamonroll',
          passwordConfirmation: 'cinnamonroll',
          circle: {
            approved: [],
            requested: []
          }
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
          },
          {
            name: 'Pear Tree Cafe',
            address: 'SE8 5ET',
            category: 'Bistro/Brunch',
            website: 'https://thepeartreekitchen.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 2,
            notes: '',
            user: users[2]
          },
          {
            name: 'Lantana',
            address: 'EC1Y 1HQ',
            category: 'Bistro/Brunch',
            website: 'https://www.lantanacafe.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 3,
            notes: '',
            user: users[2]
          },
          {
            name: 'Granger & Co',
            address: 'SW1X 0BP',
            category: 'Bistro/Brunch',
            website: 'https://grangerandco.com',
            priciness: 2,
            openLate: false,
            privacy: 1,
            notes: '',
            user: users[2]
          }, 
          {
            name: 'Founder\'s Arms',
            address: 'SE1 9JH',
            category: 'Pub',
            website: 'https://foundersarms.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 2,
            notes: '',
            user: users[2]
          },
          {
            name: 'Market Place',
            address: 'W1 8AH',
            category: 'Pub',
            website: 'https://www.marketplace-london.com',
            priciness: 2,
            openLate: true,
            privacy: 1,
            notes: '',
            user: users[2]
          },
          {
            name: 'Mulberry Bush',
            address: 'SE1 9PP',
            category: 'Pub',
            website: 'https://mulberrybushpub.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 3,
            notes: '',
            user: users[2]
          },
          {
            name: 'Ole & Steen',
            address: 'SW1Y 4RN',
            category: 'Coffee Shop',
            website: 'https://oleandsteen.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 2,
            notes: '',
            user: users[2]
          }, 
          {
            name: 'Forge & Co',
            address: 'E1 6HU',
            category: 'Coffee Shop',
            website: 'https://www.forgeandco.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 1,
            notes: '',
            user: users[2]
          },
          {
            name: 'Kaffeine',
            address: 'W1W 7QJ',
            category: 'Coffee Shop',
            website: 'https://kaffeine.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 3,
            notes: '',
            user: users[2]
          },
          {
            name: 'Kipferl',
            address: 'N1 8ED',
            category: 'Restaurant',
            website: 'https://kipferl.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 1,
            notes: '',
            user: users[2]
          },
          {
            name: 'Boro Bistro',
            address: 'SE1 9QQ',
            category: 'Restaurant',
            website: 'https://borobistro.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 2,
            notes: '',
            user: users[2]
          },
          {
            name: 'Temakinho',
            address: 'W1D 4TF',
            category: 'Restaurant',
            website: 'https://www.temakinho.com',
            priciness: 3,
            openLate: false,
            privacy: 3,
            notes: '',
            user: users[2]
          },
          {
            name: 'Postcard Teas',
            address: 'W1S 1AG',
            category: 'Shop',
            website: 'https://www.postcardteas.com',
            priciness: 3,
            openLate: false,
            privacy: 2,
            notes: '',
            user: users[2]
          },
          {
            name: 'Inspitalfields',
            address: 'E1 6EA',
            category: 'Shop',
            website: 'https://www.inspitalfields.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 3,
            notes: '',
            user: users[2]
          },
          {
            name: 'Scribbler',
            address: 'WC1V 7DS',
            category: 'Shop',
            website: 'https://www.scribbler.com',
            priciness: 1,
            openLate: false,
            privacy: 1,
            notes: '',
            user: users[2]
          }
        ]
        )
      })
      .then(locations => console.log(`${locations.length} Locations created`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  }
)