const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const connectDB = require('./config/db')

app.use(express.json())

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is Running at ${PORT}`)
})