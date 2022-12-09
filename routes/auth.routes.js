const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router  = Router()

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            throw new Error ('all fields are required!')
        }
        const user = await User.findOne({email});
        if (user) {
            throw new Error('email already registered')
        }
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await User.create({
            username,
            email,
            passwordHash: hash
        })
        res.status(201).json({username: newUser.username, email: newUser.email})
    } catch (error) {
        res.status(500).json({msg:`User not created: ${error.message}`})
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
        const compareHash = bcrypt.compareSync(password, user.passwordHash)

        if(!compareHash) {
            res.status(401).json({ message: 'Invalid password' })
            return
        }

        const payload = {
            id: user._id,
            username: user.name,
            email,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1y' })
        res.status(200).json({ ...payload, token })
    } catch (error) {
        next(error)
    }
})

module.exports = router