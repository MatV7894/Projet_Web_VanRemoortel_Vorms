const express = require('express')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const authRouter = require('./routes/auth.js')
const carRouter = require('./routes/car.js')
const reservationRouter = require('./routes/reservation.js')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({secret: 'dNaJ95a4RbWlBUmy7R9kZP8COzgYrkzgTj4YtDAV', saveUninitialized: false, resave: false}))
app.use(express.static(path.join(__dirname, '../client')))

app.use('/api/auth/', authRouter)
app.use('/api/car/', carRouter)
app.use('/api/reservation/', reservationRouter)

module.exports = app
