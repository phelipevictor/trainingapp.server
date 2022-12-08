const { Router } = require('express');
const Training = require('../models/Training.js');

const router = Router()

//create training FUNCIONANDO

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

//get all training FUNCIONANDO

router.get('/training', async (req, res, next) => {
    const { training } = req.params
    try {
        const training = await Training.find({ })

        if (!training) {
            return res.status(404).json({ msg: 'Training not found' })
        }

        res.status(200).json(training)
    } catch (error) {
        next(error)
    }
})

//get one training FUNCIONANDO

router.get('/training/:trainingId', async (req, res, next) => {
    const { trainingId } = req.params
    try {
        const training = await Training.findById(trainingId)

        if (!training) {
            return res.status(404).json({ msg: 'Training not found' })
        }

        res.status(200).json(training)
    } catch (error) {
        next(error)
    }
})

//update training NÃO ESTA FUNCIONANDO

router.put('/training/:trainingId/edit', async (req, res) => {
    const { trainingId } = req.params
    const { name, description, type} = req.body
    try {
        const updatedTraining = await Training.findOneAndUpdate({ trainingId }, req.body, {
            new: true
        });

        res.status(200).json(updatedTraining);
    } catch (error) {
        res.status(500).json({msg:`Can't update Training`, error})
    }
})

//delete training FUNCIONANDO

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

module.exports = router