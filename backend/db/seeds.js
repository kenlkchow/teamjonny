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
        },
        {
          username: 'nick',
          password: 'nick',
          passwordConfirmation: 'nick',
          circle: {
            approved: [],
            requested: []
          }
        }
        ])
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
          },
          {
            name: 'Roof East',
            postcode: 'E15 1BB',
            category: 'Pub',
            website: 'https://www.strongroombar.com',
            priciness: 2,
            openLate: true,
            privacy: 1,
            notes: 'Rooftop bar',
            user: users[1]
          },
          {
            name: 'Ken\'s apartment',
            postcode: 'E20 1HR',
            category: 'Pub',
            website: 'lantanaheights.com',
            priciness: 3,
            openLate: true,
            privacy: 3,
            notes: 'Luxury',
            user: users[1]
          },
          {
            name: 'Caravan Coffee',
            postcode: 'N7 9DP',
            category: 'Coffee Shop',
            website: 'https://www.caravancoffeeroasters.co.uk/',
            priciness: 1,
            openLate: false,
            privacy: 1,
            notes: 'Nice Coffee',
            user: users[1]
          },
          {
            name: 'Formans Restaurant',
            postcode: 'E3 2NT',
            category: 'Restaurant',
            website: 'formans.co.uk',
            priciness: 3,
            openLate: true,
            privacy: 2,
            notes: 'Great food',
            user: users[1]
          },
          {
            name: 'The Bear',
            postcode: 'SL6 1QJ',
            category: 'Pub',
            website: 'https://www.jdwetherspoon.com/pubs/all-pubs/england/berkshire/the-bear-maidenhead',
            priciness: 1,
            openLate: true,
            privacy: 1,
            notes: 'Great place to go before watching the Magpies play at York Road',
            user: users[0]
          },
          {
            name: 'The Maidens Head',
            postcode: 'SL6 1QE',
            category: 'Pub',
            website: 'https://www.themaidenshead.co.uk/',
            priciness: 2,
            openLate: false,
            privacy: 1,
            notes: 'Good pub to watch the grand national or before going on a cheeky trip to Smokey Joes.',
            user: users[0]
          },
          {
            name: 'O\'Neill\'s',
            postcode: 'RG1 1DB',
            category: 'Pub',
            website: 'https://www.oneills.co.uk/national-search/south-east/reading',
            priciness: 1,
            openLate: true,
            privacy: 1,
            notes: 'Sticky floors, low ceiling, good for World Cups.',
            user: users[0]
          },
          {
            name: 'Monk\'s Retreat',
            postcode: 'RG1 1HE',
            category: 'Pub',
            website: 'https://www.greatukpubs.co.uk/monksretreatreading',
            priciness: 1,
            openLate: true,
            privacy: 1,
            notes: 'Now has screens to show the football',
            user: users[0]
          },
          {
            name: 'Brickwood',
            postcode: 'SW4 7AB',
            category: 'Coffee Shop',
            website: 'http://www.brickwoodlondon.com/clapham/',
            priciness: 2,
            openLate: false,
            privacy: 1,
            notes: 'Nice Australian Themed Cafe',
            user: users[0]
          },
          {
            name: 'Ozone Coffee',
            postcode: 'EC2A 4AQ',
            category: 'Coffee Shop',
            website: 'ozonecoffee.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 1,
            notes: 'Good cuppa joe right here',
            user: users[0]
          },
          {
            name: 'Shoreditch Grind',
            postcode: 'EC1V 9NR',
            category: 'Coffee Shop',
            website: 'https://grind.co.uk/pages/shoreditch-grind',
            priciness: 2,
            openLate: false,
            privacy: 1,
            notes: 'Good place to meet tech recruiters',
            user: users[0]
          },
          {
            name: 'Pret A Manger',
            postcode: 'EC1Y 1HQ',
            category: 'Coffee Shop',
            website: 'https://grind.co.uk/pages/shoreditch-grind',
            priciness: 2,
            openLate: false,
            privacy: 1,
            notes: 'Standard',
            user: users[0]
          },
          {
            name: 'Duck and Waffle',
            postcode: 'EC2N 4AY',
            category: 'Restaurant',
            website: 'https://duckandwaffle.com/',
            priciness: 3,
            openLate: true,
            privacy: 1,
            notes: '24 hours babyyyyyyyy',
            user: users[0]
          },
          {
            name: 'The Athenian',
            postcode: 'E1 6GY',
            category: 'Restaurant',
            website: 'https://www.athand.co.uk/restaurant/the-athenian---shoreditch',
            priciness: 2,
            openLate: true,
            privacy: 1,
            notes: 'Best sauce of all time',
            user: users[0]
          },
          {
            name: 'Taste of Tennessee',
            postcode: 'N1 6HB',
            category: 'Restaurant',
            website: '',
            priciness: 1,
            openLate: false,
            privacy: 1,
            notes: 'Okay listen boom. You go up counter and arx bossman for 4 chicken wings and a strip meal. Strawberry Mirinda. Fine establishment and one of London\'s best kept secrets.',
            user: users[0]
          },
          {
            name: 'Redan',
            postcode: 'RG40 1XG',
            category: 'Other',
            website: 'https://www.theredan.bar/',
            priciness: 2,
            openLate: true,
            privacy: 1,
            notes: 'Woko\'s biggest night out. The strawberry daiquiri is delightful.',
            user: users[0]
          },
          {
            name: 'Sports Direct',
            postcode: 'E1 7RA',
            category: 'Shop',
            website: '',
            priciness: 1,
            openLate: false,
            privacy: 1,
            notes: 'Sport\'s direct dot com, UK\'s number 1.',
            user: users[0]
          },
          {
            name: 'Petit Pois Bistro',
            postcode: 'N1 6NU',
            category: 'Bistro/Brunch',
            website: 'https://www.petitpoisbistro.com/alldaymenu/',
            priciness: 2,
            openLate: true,
            privacy: 1,
            notes: 'Located above its basement sibling Happiness Forgets (one of London\'s best bars), this sweet French bistro overlooks Hoxton Square. ',
            user: users[0]
          },
          {
            name: 'Boro Bistro',
            postcode: 'SE1 9QQ',
            category: 'Bistro/Brunch',
            website: 'http://borobistro.co.uk/',
            priciness: 2,
            openLate: true,
            privacy: 1,
            notes: 'Chic restaurant, wine bar and terrace with Gallic ambiance, serving French fare with Asian touches.',
            user: users[0]
          },
          {
            name: 'Smokey Joe\'s',
            postcode: 'SL6 1LB',
            category: 'Other',
            website: 'https://www.smokey-joes.co.uk/',
            priciness: 1,
            openLate: true,
            privacy: 1,
            notes: 'VK\'s at Smokey\'s',
            user: users[0]
          },
          {
            name: 'The Hoop and Grapes',
            postcode: 'EC3N 1AL',
            category: 'Pub',
            website: 'https://www.nicholsonspubs.co.uk',
            priciness: 2,
            openLate: true,
            privacy: 1,
            notes: 'There\'s not a right angle in sight at this timber-framed pub, which escaped the Great Fire of 1666.',
            user: users[0]
          },
          {
            name: 'Duke Of Somerset',
            postcode: 'E1 8AH',
            category: 'Pub',
            website: '',
            priciness: 1,
            openLate: true,
            privacy: 1,
            notes: 'Traditional, airy pub with large menu of British pub grub, plus live sport on TV and outdoor screen.',
            user: users[0]
          },
          {
            name: 'White Swan',
            postcode: 'E1 8DE',
            category: 'Pub',
            website: '',
            priciness: 1,
            openLate: false,
            privacy: 1,
            notes: 'Traditional City drinking spot with wood-panelling, Kent cask ale and English pub food.',
            user: users[0]
          },
          {
            name: 'Gaylord Tandoori',
            postcode: 'RG10 9ER',
            category: 'Restaurant',
            website: 'gaylordtandoori.co.uk',
            priciness: 2,
            openLate: false,
            privacy: 1,
            notes: 'Their food is bomb.',
            user: users[1]
          },
          {
            name: 'McQueen',
            postcode: 'EC2A 4AA',
            category: 'Bar',
            website: 'http://mcqueen-shoreditch.co.uk/',
            priciness: 2,
            openLate: true,
            privacy: 2,
            notes: 'Speedy bar',
            user: users[1]
          },
          {
            name: 'JinJuu',
            postcode: 'W1B 5PS',
            category: 'Bar',
            website: 'https://jinjuu.com/london-soho/',
            priciness: 2,
            openLate: true,
            privacy: 1,
            notes: 'Great for overpriced soju',
            user: users[1]
          }
        ]
        )
      })
      .then(locations => console.log(`${locations.length} Locations created`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  }
)