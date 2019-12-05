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

module.exports = {
  index,
  indexPublic
}
