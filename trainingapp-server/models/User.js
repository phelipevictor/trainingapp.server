const { Schema, model } = require('mongoose')

const userSchema = new Schema (
  {
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
   },
   { Timestamps: true}
   )

   module.exports = model('User', userSchema)