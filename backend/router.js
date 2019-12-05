const router = require('express').Router()
<<<<<<< HEAD
const locations = require('./controllers/locations')
=======
<<<<<<< HEAD
const locations = require('./controllers/locations')
=======
>>>>>>> 2d9dcf5d383846d3e1a3e24d709792d5945e61a7
const users = require('./controllers/users')
<<<<<<< HEAD
>>>>>>> development
=======
const secureRoute = require('./lib/returnUnauthorised')
>>>>>>> 25ef8491074ff04deb91a3290b367c14aeb11133

router.route('/locations')
<<<<<<< HEAD
  .get(secureRoute, locations.index)

router.route('/locations/public')
  .get(secureRoute, locations.indexPublic)

router.route('/locations/circle')
  .get(secureRoute, locations.indexCircle)

router.route('/locations/private')
  .get(secureRoute, locations.indexPrivate)

router.route('/locations/:id')
  .get(secureRoute, locations.show)
=======
  .get(locations.index)
  .post(locations.create)

router.route('/locations/:id')
  .put(locations.update)
  .delete(locations.remove)


>>>>>>> 2d9dcf5d383846d3e1a3e24d709792d5945e61a7

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

module.exports = router

