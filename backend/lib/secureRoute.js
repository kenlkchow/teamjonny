const User = require('../models/User')
const { secret } = require('../config/environment')
const jwt = require('jsonwebtoken')
const returnUnauthorised = require('./returnUnauthorised')

function secureRoute(req, res, next) {
  const token = req.headers.authorization.replace('Bearer ', '')

  if (token === 'null') {
    return returnUnauthorised(res)
  } 

  jwt.verify(token, secret, (err, payload) => {
    User
      .findById(payload.sub)
      .then(user => {
        if (!user) return returnUnauthorised(res)
        req.currentUser = user
        next()
      })
      .catch(() => returnUnauthorised(res))
  })
}

module.exports = secureRoute