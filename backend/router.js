const router = require('express').Router()
const locations = require('./controllers/locations')
const users = require('./controllers/users')
const secureRoute = require('./lib/returnUnauthorised')

router.route('/locations')
  .get(secureRoute, locations.index)

router.route('/locations/public')
  .get(secureRoute, locations.indexPublic)

router.route('/locations/circle')
  .get(secureRoute, locations.indexCircle)

router.route('/locations/private')
  .get(secureRoute, locations.indexPrivate)

router.route('/locations/:id')
  .get(secureRoute, locations.show)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

module.exports = router

