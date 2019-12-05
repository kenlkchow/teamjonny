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
  .pre('save',  function hashPassword(next) { // this happens before the mode is saved
    if (this.isModified('password')) { // if the password has been created or changed
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8)) // reassign as a hash of itself
    }
    next() // now move on to saving
  })

userSchema.methods.validatePassword = function validatePassword(password) {// our own methods attached to our user model to validate if a password is correct at login.
  return bcrypt.compareSync(password, this.password) // bcyrpt hashes the password our user is trying to login with the same it hashed the one stored in the DB when they registered, it then compares them for us to see if they match, and returns true or false depending on the outcome
}
module.exports = mongoose.model('User', userSchema) //exporting our models, with all its new methods and functiionality to be used in the user controller. see /controllers/user.js