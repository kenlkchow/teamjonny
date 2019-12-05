const Location = require('../models/Location')

function index(req, res) {
  Location
    .find()
    .then(locations => res.status(200).json(locations))
    .catch(err => console.log(err))
}

function indexPublic(req, res) {
  Location
    .find({ privacy: { $eq: 1 } })
    .then(locations => res.status(200).json(locations))
    .catch(err => console.log(err))
}

function indexCircle(req, res) {
  Location
    .find({ privacy: { $eq: 2 } })
    .then(locations => res.status(200).json(locations))
    .catch(err => console.log(err))
}

function indexPrivate(req, res) {
  Location
    .find({ privacy: { $eq: 3 } })
    .then(locations => res.status(200).json(locations))
    .catch(err => console.log(err))
}

function show(req, res) {
  Location
    .findById(req.params.id)
    .then(location => {
      if (!location) {
        return res.status(404).json({ message: '404 not found' })
      } else {
        return res.status(200).json(location)
      }
    })
    .catch(err => console.log(err))
}

function create(req, res, next) {
  req.body.user = req.currentUser
  Location.create(req.body)
    .then(location => res.status(201).json(location))
    .catch(next)
}

function remove(req, res) {
  Location
    .findById(req.params.id)
    .then(location => {
      if (!location) return res.status(404).json({ message: 'Not Found' })
      return location.remove()
    })
    .then(() => res.status(200).json({ message: 'Location deleteted' }))
    .catch(err => console.log(err))
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
  index,
  indexPublic,
  indexCircle,
  indexPrivate,
  show,
  remove,
  update,
  create
}