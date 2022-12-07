const { Router } = require('express');
const Exercise = require('../models/Exercise.js');

const router = Router()

//create exercise FUNCIONANDO

router.post('/exercise', async (req, res, next) => {
    const { name } = req.body
    try { 
        const exercise = await Exercise.findOne({ name })

        if (exercise) {
            return res.status(404).json({ msg: 'Exercise already exists' })
        }

        const newExercise = await Exercise.create({
        ...req.body
        })
        res.status(201).json(newExercise)
    } catch (error) {
        next(error)
    }
})

//get all exercises FUNCIONANDO

router.get('/exercise', async (req, res, next) => {
    const { exercise } = req.params
    try {
        const exercise = await Exercise.find({ })

        if (!exercise) {
            return res.status(404).json({ msg: 'Exercise not found' })
        }

        res.status(200).json(exercise)
    } catch (error) {
        next(error)
    }
})

//get one exercise, ESTA RETORNANDO O PRIMEIRO EXERCICIO APENAS, NÃO RETORNA O CORRETO

router.get('/exercise/:exerciseId', async (req, res, next) => {
    const { exerciseId } = req.params
    try {
        const exercise = await Exercise.findOne({ id: exerciseId })

        if (!exercise) {
            return res.status(404).json({ msg: 'Exercise not found' })
        }

        res.status(200).json(exercise)
    } catch (error) {
        next(error)
    }
})

//update exercise

router.put('/exercise/:exerciseId/edit', async (req, res) => {
    const { exerciseId } = req.params;
    const {name, muscularGroup, type, description, imageUrl, youtubeUrl} = req.body
    try {
        const updatedExercise = await Exercise.findByIdAndUpdate({_name, muscularGroup, type, description, imageUrl, youtubeURL, exerciseId }, req.body, {
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

//delete exercise

router.delete('/exercises/:exerciseId', async (req, res) => {
    const { exerciseId } = req.params;  
    try {
        const exercise = await Exercise.findByIdAndDelete(exerciseId)
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