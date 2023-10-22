const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
const multer = require('multer');
const cors = require('cors')
const {errorHandler} = require('./middleware/error')
const connectDB = require('./config/db')
const port = process.env.PORT || 5001

connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(multer().array())
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));


app.use('/api/v1/users', require('./routes/userRoutes'))
app.use('/api/v1/connections', require('./routes/connectionRoutes'))
app.use('/api/v1/itineraries', require('./routes/itineraryRoutes'))


app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
