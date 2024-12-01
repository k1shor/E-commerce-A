const express = require('express')
require('dotenv').config()
require('./database/connection')

const app = express()

const port = process.env.PORT

app.listen(port,  ()=>console.log("APP STARTED SUCCESSFULLY"))