const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const connectDB = require('./config/db')
const userRouter = require('./controllers/userController')
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use('/api/auth', userRouter)
app.use('/uploads', express.static('uploads'))

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is Running at ${PORT}`)
})