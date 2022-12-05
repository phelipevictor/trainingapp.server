const { Router } = require('express');
const Training = require('../models/Training.js');

const router = Router()

//create training

router.post('/mytraining/:trainingName', async (req, res, next) => {
    const { trainingName } = req.params
    try { 
        const training = await Training.findOne({ name: trainingName })
        if(!training) {
            return res.status(404).json({msg: 'Training not found'})
        }
        const newTraining = await Training.create({
            ...req.body,
            trainingId: training._id,
        })

        res.status(201).json(newTraining)
    } catch (error) {
        next(error)
    }
})

//get one training

router.get('/mytraining/:trainingName', async (req, res, next) => {
    const { trainingName } = req.params
    try {
        const training = await Training.findOne({ name: trainingName })

        if (!training) {
            return res.status(404).json({ msg: 'Training not found' })
        }

        const trainings = await training.find({ trainingId: training._id })
        res.status(200).json(trainings)
    } catch (error) {
        next(error)
    }
})

//get all training

router.get('/training', async (req, res, next) => {
    const { training } = req.params
    try {
        const training = await Training.find({ name: trainingName })

        if (!training) {
            return res.status(404).json({ msg: 'Training not found' })
        }
        throw new Error('Forced error')

        const trainings = await training.find({ trainingId: training._id })
        res.status(200).json(trainings)
    } catch (error) {
        next(error)
    }
})

//update training by Id

router.put('/mytraining/:id/', async (req, res) => {
    const { id } = req.params;
    const trainingId = req.user.id
    const {name, description, type, trainingId} = req.body
    try {
        const updatedTraining = await Training.findOneAndUpdate({_id: id, training: trainingId}, req.body, {
            new: true
        });
        if (!updatedTraining) {
            const error = new Error('Can not update training from admin')
            throw error
        }
        res.status(200).json(updatedTraining);
    } catch (error) {
        res.status(500).json({msg:`Can't update Training`, error})
    }
})

//delete training by Id

router.delete('/mytraining/:trainingName', async (req, res) => {
    const { id } = req.params;
    const trainingId = req.training.id;
    try {
        const training = await Training.findById(id)
        console.log(trainingId, training.id)
            if (training.name.toString() !== trainingId) {
                const error = new Error('Can not delete training from admin')
                throw error 
            }
            training.delete();
            res.status(202).json('Training was deleted')
        } catch (error) {
            res.status(500).json({msg:`Can not delete Training`, error})
        }
})

module.exports = router