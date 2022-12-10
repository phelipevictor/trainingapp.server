const { Router } = require('express');
const Training = require('../models/Training.js');
const ExerciseTraining = require('../models/ExerciseTraining.js')
const Exercise = require('../models/Exercise.js')

const router = Router()

//create training

router.post('/training', async (req, res, next) => {
    const { name } = req.body
    try { 
        const training = await Training.findOne({ name })

        if(training) {
            return res.status(404).json({msg: 'Training already exists'})
        }

        const newTraining = await Training.create({
            ...req.body
        })

        res.status(201).json(newTraining)
    } catch (error) {
        next(error)
    }
})

//get all training

router.get('/training', async (req, res, next) => {
    const { training } = req.params
    try {
        const training = await Training.find()

        if (!training) {
            return res.status(404).json({ msg: 'Training not found' })
        }

        res.status(200).json(training)
    } catch (error) {
        next(error)
    }
})

//get one training

router.get('/training/:trainingId', async (req, res, next) => {
    const { trainingId } = req.params
    try {
        const training = await Training.findById(trainingId).populate({ path:'exercises',populate: { path:'exerciseId',model:'Exercise'}})

        if (!training) {
            return res.status(404).json({ msg: 'Training not found' })
        }

        res.status(200).json(training)
    } catch (error) {
        next(error)
    }
})

//update training

router.put('/training/:trainingId/edit', async (req, res) => {
    const { trainingId } = req.params
    const { name, group, description, exerciseTraining, type, level } = req.body
    try {
        const updatedTraining = await Training.findByIdAndUpdate(trainingId, req.body, {
            new: true
        });

        res.status(200).json(updatedTraining);
    } catch (error) {
        res.status(500).json({msg:`Can't update Training`, error})
    }
})

//delete training

router.delete('/training/:trainingId/delete', async (req, res) => {
    const { trainingId } = req.params
    try {
        const training = await Training.findByIdAndDelete(trainingId)
            if (training.name.toString() !== trainingId) {
                const error = new Error('Can not delete training from admin')
            
            }
            training.delete();
            res.status(202).json('Training was deleted')
        } catch (error) {
            res.status(500).json({msg:`Can not delete Training`, error})
        }
})

router.post('/training/:trainingId/addexercise', async (req,res) => {
    const { trainingId } = req.params
    const { exerciseId, type } = req.body
    try {
        const training = await Training.findById(trainingId)
        console.log(training.group)
        const exercise = await Exercise.findById(exerciseId)
        if (!training.group.includes(type)) 
        {
        res.status(400).json(`Training Group is ${training.group}`)
        }
        const exerciseTraining = await ExerciseTraining.create({ exerciseId, type, trainingId });
        await Training.findByIdAndUpdate(trainingId, { $push:{ exercises: exerciseTraining.id}})
        res.status(200).json(exerciseTraining)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: `Could not create Training group`})
    }
    
})

module.exports = router