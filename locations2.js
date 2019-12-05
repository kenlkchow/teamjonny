const Location = require('./backend/models/Location')

function create(req, res, next) {  
  req.body.user = req.currentUser
  Location.create(req.body)
    .then(location => res.status(201).json(location))
    .catch(next)
}

function update(req, res) {
  Location 
    .findById(req.params.id)
    .then(location => {
      if (!location) return res.status(404).json({ message: '404 not found' })
      if (!req.currentUser._id.equals(location.user)) return res.status(401).json({ message: 'Unauthorized' })
      return location.set(req.body)
    })
    .then(location => location.save())
    .then(location => res.status(202).json(location))
}

module.exports = {
  update,
  create
}