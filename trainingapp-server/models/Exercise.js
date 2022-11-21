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
        'Back', 'Chest', 'Bíceps', 'Tríceps', 'Shoulders', 'ABS', 'Quads', 'Harmstrings', 'Calves', 'Compound', 'Gluteus', 'Traps', 'Forearm'
    ],
        required: [true, 'Muscular Group is required'],
    },
    muscularGroup: {
        type: String,
        Enum: [
        'Cardio', 'Free Weight', 'Machine', 'Body Weight'    
        ],
        required: [true, 'Type of the exercise is required'],
    }
   },
   { Timestamps: true}
   )

   module.exports = model('Exercise', exerciseSchema)