const { Router } = require('express');
const Training = require('../models/Training.js');

const router = Router()

router.post('/homepage/:trainingName', async (req, res, next) => {
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

router.get('/exercise/:trainingName', async (req, res, next) => {
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

module.exports = router