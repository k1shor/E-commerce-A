const express = require('express')
require('dotenv').config()
require('./database/connection')

const morgan = require('morgan')

const cors = require('cors')

const UserRoute = require('./routes/userRoutes')

const app = express()

const port = process.env.PORT


app.use(express.json())
app.use(cors())
app.use(morgan('dev'))



app.use(UserRoute)


app.listen(port, ()=>console.log("APP STARTED SUCCESSFULLY"))

