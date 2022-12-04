const { Schema, model } = require('mongoose')

const exerciseSchema = new Schema (
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    muscularGroup: {
      type: String,
      Enum: [
      'Back', 'Chest', 'Bíceps', 'Tríceps', 'Shoulders', 'ABS', 'Quads', 'Hamstrings', 'Calves', 'Compound', 'Gluteus', 'Traps', 'Forearm'
    ],
      required: [true, 'Muscular Group is required'],
    },
    type: {
      type: String,
      Enum: [
      'Cardio', 'Free Weight', 'Machine', 'Body Weight', 'Barbell', 'Dumbbell', 'CrossOver', 'Plate'    
      ],
      required: [true, 'Type of the exercise is required'],
    },
    description: {
      type: String,
      required: [true, 'Description of the exercise is required']
    },
    imageUrl: String,
    youtubeUrl: {
        type: String,
        validate: {
          validator: (text) => text.indexOf('https://www.youtube.com/') === 0,
          message: 'Youtube url must start with https://www.youtube.com/',
        },
      },
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
   },
   { Timestamps: true}
   )

   module.exports = model('Exercise', exerciseSchema)