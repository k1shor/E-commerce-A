const express = require('express')
require('dotenv').config()
require('./database/connection')

const UserRoute = require('./routes/userRoutes')

const app = express()

const port = process.env.PORT


app.use(express.json())

app.use(UserRoute)

app.listen(port, ()=>console.log("APP STARTED SUCCESSFULLY"))