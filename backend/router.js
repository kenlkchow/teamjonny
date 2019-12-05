const router = require('express').Router()
const locations = require('./controllers/locations')
const users = require('./controllers/users')
const secureRoute = require('./lib/secureRoute')


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
  .post(secureRoute, locations.create)
  .put(locations.update)
  .delete(locations.remove)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/circle')
  .post(secureRoute, users.addToCircle)
  .put(secureRoute, users.approveToCircle)
  .delete(secureRoute, users.removeFromCircle)

module.exports = router

