const { Schema, model } = require('mongoose')

const exerciseTrainingSchema = new Schema (
  {
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise'
    },
    type: {
      type: String,
      enum: ['Fullbody', 'A', 'B', 'C', 'D', 'E', 'F'],
    },
    trainingId: { type: Schema.Types.ObjectId, ref: 'Training'},
   },
   { Timestamps: true}
   )

   module.exports = model('ExerciseTraining', exerciseTrainingSchema)