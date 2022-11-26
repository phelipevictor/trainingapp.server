const { Router } = require('express');
const Exercise = require('../models/Exercise.js');

const router = Router()

router.post('/exercise/:exerciseName', async (req, res, next) => {
    const { exerciseName } = req.params
    try { 
        const exercise = await Exercise.findOne({ name: exerciseName })

        if (!region) {
            return res.status(404).json({ msg: 'Exercise not found' })
        }

        const newExercise = await Exercise.create({
        ...req.body, 
        exerciseId: exercise._id,
        })
        res.status(201).json(newExercise)
    } catch (error) {
        next(error)
    }
})

router.get('/exercise/:exerciseName', async (req, res, next) => {
    const { exerciseName } = req.params
    try {
        const exercise = await Exercise.findOne({ name: exerciseName })

        if (!region) {
            return res.status(404).json({ msg: 'Exercise not found' })
        }
        throw new Error('Forced error')

        const exercises = await exercise.find({ exerciseId: exercise._id })
        res.status(200).json(exercises)
    } catch (error) {
        next(error)
    }
})

module.exports = router