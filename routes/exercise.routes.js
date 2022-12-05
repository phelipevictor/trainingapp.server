const { Router } = require('express');
const Exercise = require('../models/Exercise.js');

const router = Router()

//create exercise

router.post('/exercise/:exerciseName', async (req, res, next) => {
    const { exerciseName } = req.params
    try { 
        const exercise = await Exercise.findOne({ name: exerciseName })

        if (!exercise) {
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

//get one exercise by Id

router.get('/exercise/:exerciseName', async (req, res, next) => {
    const { exerciseName } = req.params
    try {
        const exercise = await Exercise.findOne({ name: exerciseName })

        if (!exercise) {
            return res.status(404).json({ msg: 'Exercise not found' })
        }
        throw new Error('Forced error')

        const exercises = await exercise.find({ exerciseId: exercise._id })
        res.status(200).json(exercises)
    } catch (error) {
        next(error)
    }
})

//get all exercises

router.get('/exercise', async (req, res, next) => {
    const { exercise } = req.params
    try {
        const exercise = await Exercise.find({ name: exerciseName })

        if (!exercise) {
            return res.status(404).json({ msg: 'Exercise not found' })
        }
        throw new Error('Forced error')

        const exercises = await exercise.find({ exerciseId: exercise._id })
        res.status(200).json(exercises)
    } catch (error) {
        next(error)
    }
})

//update exercise by Id

router.put('/exercise/:id/', async (req, res) => {
    const { id } = req.params;
    const exerciseId = req.user.id
    const {name, muscularGroup, type, description, imageUrl, youtubeUrl, exerciseId} = req.body
    try {
        const updatedExercise = await Exercise.findOneAndUpdate({_id: id, exercise: exerciseId}, req.body, {
            new: true
        });
        if (!updatedExercise) {
            const error = new Error('Can not update exercise from admin')
            throw error
        }
        res.status(200).json(updatedExercise);
    } catch (error) {
        res.status(500).json({msg:`Can't update Exercise`, error})
    }
})

//delete exercise by Id

router.delete('/:exerciseName', async (req, res) => {
    const { id } = req.params;
    const exerciseId = req.exercise.id;
    try {
        const exercise = await Exercise.findById(id)
        console.log(exerciseId, exercise.id)
            if (exercise.name.toString() !== exerciseId) {
                const error = new Error('Can not delete exercise from admin')
                throw error 
            }
            exercise.delete();
            res.status(202).json('Exercise was deleted')
        } catch (error) {
            res.status(500).json({msg:`Can not delete Exercise`, error})
        }
})

module.exports = router