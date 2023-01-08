const mongoose = require('mongoose')

const itinerarySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    details: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Itinerary', itinerarySchema)
