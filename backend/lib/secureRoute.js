const User = require('../models/User')
const { secret } = require('../config/environment')
const jwt = require('jsonwebtoken')
// const returnUnauthorised = require('./returnUnauthorised')

function secureRoute(req, res, next) {

  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) { // checks if our request has a header of authorization or if it does, does the value of authorizaion begin with the string 'Bearer'. If not we send back 401 error and end the process.
    return res.status(401).json({ message: 'Unauthorized' })
  }
  
  const token = req.headers.authorization.replace('Bearer ', '')

  if (token === '') {
    return res.status(401).json({ message: 'Unauthorized' })
  } 

  jwt.verify(token, secret, (err, payload) => {
    console.log(payload, payload.sub)
    User
      .findById(payload.sub)
      .then(user => {
        if (!user)  return res.status(401).json({ message: 'Unauthorized' })
        req.currentUser = user
        next()
      })
      .catch(() =>  res.status(401).json({ message: 'Unauthorized' }))
  })
}

module.exports = secureRoute