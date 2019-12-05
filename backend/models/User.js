const mongoose = require('mongoose') 
const bcrypt = require('bcrypt') 

const circleSchema = new mongoose.Schema({
  approved: { type: [mongoose.Schema.ObjectId], ref: 'User' },
  requested: { type: [mongoose.Schema.ObjectId], ref: 'User' }
})

const userSchema = new mongoose.Schema({ 
  username: { type: String, required: true, unique: true }, 
  password: { type: String, required: true  },
  circle: [ circleSchema ]
}, {
  timestamps: true, 
  toJSON: { 
    transform(doc, json) {
      return { username: json.username }
    }
  }
})

userSchema.plugin(require('mongoose-unique-validator'))

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation  = passwordConfirmation
  })

userSchema
  .pre('validate', function checkPassword(next) { 
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match') 
    }
    next() 
  })

userSchema
  .pre('save',  function hashPassword(next) { 
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8)) 
    }
    next() 
  })

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password) 
}
module.exports = mongoose.model('User', userSchema) 