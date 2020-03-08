require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const app = express()
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

const validateBearerToken =  require('./validateBearerToken')
const errorHandler = require('./errorHandler')

const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const babiesRouter = require('./babies/babies-router')


app.get('/', (req, res) => {
  res.send('Hello, boilerplate!')
})

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(validateBearerToken)

app.use('/api/babies', babiesRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler)

module.exports = app