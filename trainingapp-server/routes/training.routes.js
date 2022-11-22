const { Router } = require('express');
const Training = require('../models/training.routes.js');

const router = Router()

router.post('/homepage/:trainingName', async (req, res) => {
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
        res.status(500).json(error)
    }
})

router.get('/exercise/:trainingName', async (req, res) => {
    const { trainingName } = req.params
    try {
        const training = await Training.findOne({ name: trainingName })

        if (!training) {
            return res.status(404).json({ msg: 'Training not found' })
        }

        const trainings = await training.find({ trainingId: training._id })
        res.status(200).json(trainings)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router