const router = require('express').Router()
<<<<<<< HEAD
const locations = require('./controllers/locations')
=======
const users = require('./controllers/users')
<<<<<<< HEAD
>>>>>>> development
=======
const secureRoute = require('./lib/returnUnauthorised')
>>>>>>> 25ef8491074ff04deb91a3290b367c14aeb11133

router.route('/locations')
  .get(locations.index)
  .post(locations.create)

router.route('/locations/:id')
  .put(locations.update)
  .delete(locations.remove)



router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

module.exports = router

