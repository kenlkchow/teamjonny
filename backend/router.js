const router = require('express').Router()

router.route('/locations')
  .get((req, res) => res.status(200).json({ message: 'yasss' } ))

module.exports = router

