import { Schema, model } from 'mongoose'
import { createHmac } from 'crypto'
import { v1 } from 'uuid'

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  encryptedPassword: {
    type: String,
    require: true,
  },
  salt: String, // extra layer of complexity to the encryption process
})

userSchema.virtual('password')
  .set(function(password) {
    this.plainTextPassword = password
    this.salt = v1()
    this.encryptedPassword = this.securePassword(password)
  })
  .get(() => {
    return this.plainTextPassword
  })

userSchema.methods = {
  authenticate: function(password) {
    return this.securePassword(password) === this.encryptedPassword
  },
  securePassword: function(password) {
    if(!password){
      return ''
    }
    try {
      return createHmac('sha256', this.salt).update(password).digest('hex')
    } catch (error) {
      return ''
    }
  }
}

export default model('User', userSchema)