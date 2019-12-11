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
            name: 'Pear Tree Cafe',
            postcode: 'SE8 5ET',
            category: 'Bistro/Brunch',
            website: 'https://thepeartreekitchen.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 2,
            notes: '',
            user: users[0]
          },
          {
            name: 'Lantana',
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
            name: 'Granger & Co',
            postcode: 'SW1X 0BP',
            category: 'Bistro/Brunch',
            website: 'https://grangerandco.com',
            priciness: 2,
            openLate: false,
            privacy: 1,
            notes: '',
            user: users[0]
          }, 
          {
            name: 'Founder\'s Arms',
            postcode: 'SE1 9JH',
            category: 'Pub',
            website: 'https://foundersarms.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 2,
            notes: '',
            user: users[0]
          },
          {
            name: 'Market Place',
            postcode: 'W1 8AH',
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
            postcode: 'SE1 9PP',
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
            postcode: 'SW1Y 4RN',
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
            postcode: 'E1 6HU',
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
            postcode: 'W1W 7QJ',
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
            postcode: 'N1 8ED',
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
            postcode: 'SE1 9QQ',
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
            postcode: 'W1D 4TF',
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
            postcode: 'W1S 1AG',
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
            postcode: 'E1 6EA',
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
            postcode: 'WC1V 7DS',
            category: 'Shop',
            website: 'https://www.scribbler.com',
            priciness: 1,
            openLate: false,
            privacy: 1,
            notes: '',
            user: users[2]
          },
          {
            name: 'The Merton Apprentice',
            postcode: 'SW19 2RD',
            category: 'Pub',
            website: 'https://www.mertonapprentice.com',
            priciness: 1,
            openLate: false,
            privacy: 2,
            notes: 'Solid pub, cheap pints',
            user: users[0]
          },
          {
            name: 'The Castle',
            postcode: 'SW17 0RG',
            category: 'Pub',
            website: 'https://www.castletooting.com',
            priciness: 2,
            openLate: true,
            privacy: 2,
            notes: 'Bit spenny but outdoor bit is nice',
            user: users[0]
          },
          {
            name: 'Wheatsheaf',
            postcode: 'SW17 7PG',
            category: 'Pub',
            website: 'https://www.thewheatsheafsw17.com',
            priciness: 1,
            openLate: true,
            privacy: 2,
            notes: 'AKA The Wheaty',
            user: users[0]
          },
          {
            name: 'The Half Moon',
            postcode: 'E1 4AA',
            category: 'Pub',
            website: 'https://www.jdwetherspoon.com/pubs/all-pubs/england/london/the-half-moon-mile-end',
            priciness: 2,
            openLate: true,
            privacy: 3,
            notes: 'Best beer garden in London',
            user: users[0]
          },
          {
            name: 'Strongrooms',
            postcode: 'EC2A 3PJ',
            category: 'Other',
            website: 'https://www.strongroombar.com',
            priciness: 2,
            openLate: true,
            privacy: 1,
            notes: 'Nice outdoor bit',
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