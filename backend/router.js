const router = require('express').Router()
const locations = require('./controllers/locations')
const users = require('./controllers/users')
const secureRoute = require('./lib/secureRoute')


router.route('/locations')
  .get(locations.index)
  .post(secureRoute, locations.create)

router.route('/locations/available')
  .get(secureRoute, locations.indexAvailable)  

router.route('/locations/:id')
  .get(secureRoute, locations.show)
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

