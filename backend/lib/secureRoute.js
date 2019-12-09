const User = require('../models/User')
const { secret } = require('../config/environment')
const jwt = require('jsonwebtoken')


function secureRoute(req, res, next) {

  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) { 
    return res.status(401).json({ message: 'Unauthorized 1' })
  }
  
  const token = req.headers.authorization.replace('Bearer ', '')

  if (token === '') {
    return res.status(401).json({ message: 'Unauthorized 2' })
  } 

  jwt.verify(token, secret, (err, payload) => {
    User
      .findById(payload.sub)
      .then(user => {
        if (!user)  return res.status(401).json({ message: 'Unauthorized 3' })
        req.currentUser = user
        next()
      })
      .catch(() =>  res.status(401).json({ message: 'Unauthorized 4' }))
  })
}

module.exports = secureRoute