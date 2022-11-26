const express = require('express');
const connectDb = require('./config/db.config.js');
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config();

const trainingRoutes = require('./routes/training.routes.js')
const exerciseRoutes = require('./routes/exercise.routes.js')
const userRoutes = require('./routes/user.routes.js')
const authRoutes = require('./routes/auth.routes.js')

connectDb()
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin: 'http://localhost:3003',
})
)

// Rotas públicas

app.use('/', authRoutes)

// Middlewares

app.use(require('./middlewares/auth.middleware'))

// Rotas Privadas

app.use('/', trainingRoutes)
app.use('/', exerciseRoutes)
app.use('/', userRoutes)

// Listen

require('./error-handling')(app)

app.listen(process.env.PORT, () => {
    console.log(`Server listen on Port ${process.env.PORT}`)
})