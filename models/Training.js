const { Schema, model } = require('mongoose')

const trainingSchema = new Schema (
  {
    name: {
      type: String,
      Enum: [
      'FullBody', 'AB', 'ABC', 'ABCD', 'ABCDE', 'ABCDEF'
      ],
      required: [true, 'Name of the training is required'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'description of the division of the training is required']
    },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise'
    }],
    type: {
      type: String,
      Enum: ['default', 'custom']
    },
   },
   { Timestamps: true}
   )

   module.exports = model('Training', trainingSchema)