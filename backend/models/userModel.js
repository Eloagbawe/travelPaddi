const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username']
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    bio: {
        type: String
    },
    interests: {
        type: String
    },
    gender: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    nationality: {
        type: String
    },
    connections: [
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Connection'
        } 
     ],
     itineraries: [
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Itinerary'
        } 
     ],
}, {
    timestamps: true
})
module.exports = mongoose.model('User', userSchema)
