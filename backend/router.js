const router = require('express').Router()
const locations = require('./controllers/locations')

router.route('/locations')
  .get(locations.index)
  .post(locations.create)

router.route('/locations/:id')
  .put(locations.update)
  .delete(locations.remove)



module.exports = router

