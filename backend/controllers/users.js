const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const returnUnauthorised = require('../lib/returnUnauthorised')

function register(req, res, next) {
  User
    .create(req.body)
    .then(() => res.status(200).json({ message: 'Welcome on board' }))
    .catch(next)
}

function login(req, res) {
  User
    .findOne({ username: req.body.username })
    .then(user => {
      console.log(user)
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorised' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' }) 
      res.status(202).json({ message: `Welcome Back ${user.username}`, token })
    }) 
    .catch(() => returnUnauthorised(res))
}



module.exports = {
  register,
  login
}
