const router = require('express').Router()
const locations = require('./controllers/locations')
const users = require('./controllers/users')

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

