const router = require('express').Router()
const users = require('./controllers/users')

router.route('/locations')
  .get((req, res) => res.status(200).json({ message: 'yasss' } ))

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

module.exports = router

