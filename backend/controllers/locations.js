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

module.exports = {
  index,
  indexPublic,
  indexCircle,
  indexPrivate,
  show
}
