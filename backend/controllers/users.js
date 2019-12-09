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
      if (!user) return res.status(404).json({ message: 'No such user found' })
      if (user.circle.requested.includes(req.currentUser._id)) return res.status(400).json({ message: 'Request already pending' })
      user.circle.requested.push(req.currentUser._id)
      return user.save()
    })
    .then(user => res.status(202).json({ message: `Request sent to ${user.username}` }))
}

function approveToCircle(req, res) {
  User
    .findOne({ username: req.body.username })
    .then(requester => {
      if (!requester) return res.status(404).json({ message: '404 not found' })
      if (!req.currentUser.circle.requested.includes(requester._id)) return res.status(402).json({ message: 'No request was sent' })
      
      requester.circle.approved.push(req.currentUser._id)
      return requester.save()
    })

    .then(requester => {
      User
        .findById(req.currentUser._id)
        .then(requestee => {
          if (!requestee) return res.status(404).json({ message: '404 not found' })
          requestee.circle.approved.push(requester._id)
          requestee.circle.requested = requestee.circle.requested.filter(id => {
            return !id.equals(requester._id)
          })
          return requestee.save()
        })

        .then(() => {
          return res.status(202).json({ message: `Request from ${requester.username} approved` })
        })
    })
}

function removeFromCircle(req, res) {
  console.log(req.body)
  User
    .findOne({ username: req.body.username })
    .then(deletee => {
      if (!deletee) return res.status(404).json({ message: '404 not found' })
      if (!req.currentUser.circle.approved.includes(deletee._id)) return res.status(402).json({ message: 'not an approved user' })
      
      deletee.circle.approved = deletee.circle.approved.filter(id => {
        return !id.equals(req.currentUser._id)
      })
      return deletee.save()
    })

    .then(deletee => {
      User
        .findById(req.currentUser._id)
        .then(deleter => {
          if (!deleter) return res.status(404).json({ message: '404 not found' })
          deleter.circle.approved = deleter.circle.approved.filter(id => {
            return !id.equals(deletee._id)
          })
          return deleter.save()
        })

        .then(() => {
          return res.status(202).json({ message: `${deletee.username} removed from circle` })
        })
    })
}

function indexCircle(req, res) {
  User
    .findById(req.currentUser._id)
    .populate('circle.approved')
    .populate('circle.requested')
    .then(user => {
      if (!user) return res.status(404).json({ message: '404 not found' })
      return user.circle
    })
    .then(circle => res.status(200).json(circle))
    .catch(err => console.log(err))
}

module.exports = {
  register,
  login,
  addToCircle,
  approveToCircle,
  removeFromCircle,
  indexCircle
}
