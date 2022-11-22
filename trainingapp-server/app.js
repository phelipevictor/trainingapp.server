const express = require('express');
const connectDb = require('./config/db.config.js');
const morgan = require('morgan')
require('dotenv').config();

const trainingRoutes = require('./routes/training.routes.js')
const exerciseRoutes = require('./routes/exercise.routes.js')

connectDb()
const app = express()
app.use(express.json())
app.use(morgan('dev'))

// Rotas

app.use('/', trainingRoutes)
app.use('/', exerciseRoutes)

// Listen

app.listen(process.env.PORT, () => {
    console.log(`Server listen on Port ${process.env.PORT}`)
})