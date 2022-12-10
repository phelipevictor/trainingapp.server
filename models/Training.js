const { Schema, model } = require('mongoose')

const trainingSchema = new Schema (
  {
    name: {
      type: String,
      required: [true, 'Name of the training is required'],
    },
    group: {
      type: String,
      enum: [
        'FullBody', 'AB', 'ABC', 'ABCD', 'ABCDE', 'ABCDEF'
        ],
    },
    description: {
      type: String,
      required: [true, 'description of the division of the training is required']
    },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'ExerciseTraining',
    }],
    type: {
      type: String,
      Enum: ['default', 'custom']
    },
    level: {
      type: String,
      Enum: [
        'Beginner', 'Intermediate', 'Advanced'
      ],
    }
   },
   { Timestamps: true}
   )

   module.exports = model('Training', trainingSchema)