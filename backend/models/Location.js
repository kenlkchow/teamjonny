const mongoose = require('mongoose')


const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: String, required: true },
  website: { type: String },
  priciness: { type: Number, min: 1, max: 3 },
  openLate: { type: Boolean },
  privacy: { type: Number, min: 1, max: 3, required: true },
  notes: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: false }

}, {
  timestamps: true
})

module.exports = mongoose.model('Location', locationSchema)

