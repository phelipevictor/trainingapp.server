const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router  = Router()

router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body

    if(!email || !password || !username) {
        res.status(400).json({ message: 'Provide email, password nad name' })
        return
    }

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

    if(!emailRegex.test(email)){
        res.status(400).json({ message: 'Provite a valid email' })
        return
    }

    const passswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}/

    if (!passwordRegex.test(password)){
        res.status(400).json({ message: 'Your password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter' })
        return
    }

    try {
    const foundedUser = await User.findOne({ email })

    if (foundedUser) {
        res.status(400).json({ message: 'User already exists' })
        return
    }

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)

    const createdUser = await User.create({ username, email, passwordHash })

    const { _id } = createdUser

    res.status(201).json({ email, username, _id })
    } catch (error) {
        next(error)
    }

})

router.post('/login', async (req, res, next) => {
    
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ message: 'User not found' })
            return
        }
        const compareHash = bcrypt.compareSync(password, username.passwordHash)

        if(!compareHash) {
            res.status(401).json({ message: 'Invalid password' })
            return
        }

        const payload = {
            id: user._id,
            email: user.email,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1y' })
        res.status(200).json({ ...payload, token })
    } catch (error) {
        next(error)
    }
})

module.exports = router