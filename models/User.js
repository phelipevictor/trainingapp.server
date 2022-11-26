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
        lowercase: true,
        trim: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    passwordHash: {
        type: String,
        required: [true, 'Password is required'],
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true 
    },
   },
   { Timestamps: true}
   )

   module.exports = model('User', userSchema)