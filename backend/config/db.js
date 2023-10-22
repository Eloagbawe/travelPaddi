const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
const connectDB = async () => {
    try {
        const mongo_uri = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : process.env.MONGO_URI_DEV
        const conn = await mongoose.connect(mongo_uri)

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB
