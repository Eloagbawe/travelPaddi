const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Itinerary = require('../models/itineraryModel')


const createItinerary = asyncHandler(async (req, res) => {
    const { start_date, end_date, country, state, city, details} = req.body

    if (!start_date || !end_date || !country) {
        res.status(400)
        throw new Error('Please provide start date, end date and destination country')
    }

    if (start_date > end_date) {
        res.status(400)
        throw new Error('Invalid dates')
    }

    const itinerary = await Itinerary.create({
        user: req.user.id,
        start_date: start_date,
        end_date: end_date,
        country: country,
        state: state,
        city: city,
        details: details
    })
    const user = await User.findById(req.user.id)
    user.itineraries.push(itinerary._id)
    await user.save()
    res.status(200).json({itinerary})
})

const updateItinerary = asyncHandler(async (req, res) => {
    const itinerary = await Itinerary.findById(req.params.id)

    if (!itinerary) {
        res.status(404)
        throw new Error('Itinerary not found')
    }
    // const user = await User.findById(req.user.id)

    //check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    //Check if user is owner of itinerary
    if (itinerary.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const {start_date, end_date, country, state, city, details} = req.body
    let format_start_date = null
    let format_end_date = null
    
    if (start_date) {
        format_start_date = new Date(start_date) 
    }
    if (end_date) {
        format_end_date = new Date(end_date)
    }
    const condition1 = format_start_date && format_end_date && (format_start_date > format_end_date)
    const condition2 = format_start_date && !format_end_date && (format_start_date > itinerary.end_date)
    const condition3 = format_end_date && !format_start_date && (format_end_date < itinerary.start_date)

    if (condition1 || condition2 || condition3) {
        res.status(400)
        throw new Error('Invalid dates')
    }

    const allowedfields = {
        start_date,
        end_date,
        country,
        state,
        city,
        details
    }
    const updatedItinerary = await Itinerary.findByIdAndUpdate(itinerary.id, allowedfields, {new: true})

    res.status(200).json({updatedItinerary})
    
})

const searchItinerary = asyncHandler(async (req, res) => {
    // const { start_date, end_date, country, state, city} = req.body
    const { start_date, end_date, country, state, city} = req.query


    if (!start_date || !end_date || !country) {
        res.status(400)
        throw new Error('Please provide start date, end date and destination country')
    }

    if (start_date > end_date) {
        res.status(400)
        throw new Error('Invalid dates')
    }

    const results = await Itinerary.find(
        {
        country: country,
        start_date: {$lt: end_date},
        end_date: {$gt: start_date},
        // $or: [{start_date: {$gte: start_date}}, {end_date: {$lte: end_date}}]
        // $or: [{start_date: {$gte: start_date}}, {end_date: {$lte: end_date}}]
    }).populate('user', { 
                        id: 1,
                        username: 1, 
                        // phone: 1,
                        // first_name: 1,
                        // last_name: 1,
                        // email: 1,
                        // bio: 1,
                        // interests: 1,
                        // gender: 1,
                        // status: 1,
                        // nationality: 1
                    })

    const search_results = results.filter((result) => result.user.id !== req.user.id)
    res.status(200).json({search_results})

})

const deleteItinerary = asyncHandler(async (req, res) => {
    const itinerary = await Itinerary.findById(req.params.id)

    if (!itinerary) {
        res.status(404)
        throw new Error('Itinerary not found')
    }

    //check for user
    const user = req.user

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    //Check if user is owner of itinerary
    if (itinerary.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const itineraryIdIndex = user.itineraries.indexOf(itinerary.id)

    user.itineraries.splice(itineraryIdIndex, 1)
    user.save()

    await itinerary.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {createItinerary, searchItinerary, updateItinerary, deleteItinerary}
