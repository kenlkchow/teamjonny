const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function register(req, res, next) {
  User
    .create(req.body)
    .then(() => res.status(200).json({ message: 'Welcome on board' }))
    .catch(err => {
      console.log(err)
      res.status(400).json({ message: err.message })
    })
}

function login(req, res) {

}



module.exports = {
  register,
  login
}
