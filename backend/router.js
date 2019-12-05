const router = require('express').Router()
const locations = require('./controllers/locations')

router.route('/locations')
  .get(locations.index)

router.route('/locations/public')
  .get(locations.indexPublic)

router.route('/locations/circle')
  .get(locations.indexCircle)

router.route('/locations/private')
  .get(locations.indexPrivate)

router.route('/locations/:id')
  .get(locations.show)

module.exports = router

