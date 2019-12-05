const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function register(req, res, next) {
  req.body.circle = {
    approved: [],
    requested: []
  }
  User
    .create(req.body)
    .then(() => res.status(200).json({ message: 'Welcome on board' }))
    .catch(next)
}

function login(req, res) {
  User
    .findOne({ username: req.body.username })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorised' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' }) 
      res.status(202).json({ message: `Welcome Back ${user.username}`, token })
    }) 
    .catch(() =>  res.status(401).json({ message: 'Unauthorized' }))
}

function addToCircle(req, res) {
  User
    .findOne({ username: req.body.username })
    .then(user => {
      console.log(user)
      if (!user) return res.status(404).json({ message: '404 not found' })
      user.circle.requested.push(req.currentUser._id)
      return user
    })
    .then(user => user.save())
    .then(user => res.status(202).json({ message: `Request sent to ${user.username}!` }))
}


module.exports = {
  register,
  login,
  addToCircle
}
