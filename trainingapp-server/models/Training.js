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
    trainingId: { type: Schema.Types.ObjectId, ref: 'Training', required: true },
   },
   { Timestamps: true}
   )

   module.exports = model('Traning', trainingSchema)