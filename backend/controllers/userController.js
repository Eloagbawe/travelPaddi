const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const Connection = require('../models/connectionModel')


const createUser = asyncHandler(async (req, res) => {
    const { username, email, password, phone } = req.body

    if (!username || !email || !password || !phone) {
        res.status(400)
        throw new Error('Please add all fields!')
    }

    //Check if user exists
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists!')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        username,
        email,
        phone,
        password: hashedPassword,
        status: 'active'
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getMe = asyncHandler(async (req, res) => {
    // const {_id, username, email, first_name, last_name,
    //        phone, bio, interests, gender, nationality, 
    //        connections, itineraries} = await User.findById(req.user.id).populate({path: 'connections'}).populate('itineraries')

           const {_id, username, email, first_name, last_name,
            phone, bio, interests, gender, nationality, 
            connections, itineraries} = req.user
    res.status(200).json({
        id: _id,
        username,
        email,
        first_name: first_name || null,
        last_name: last_name || null,
        phone,
        bio: bio || null,
        interests: interests || null,
        gender: gender || null,
        nationality: nationality || null,
        connections,
        itineraries,
    })
    // res.json({message: 'Get User'})
})
const getUser = asyncHandler(async (req, res) => {
    // const {_id, name, email} = await User.findById(req.user.id)
    const user = await User.findById(req.params.id).populate('itineraries').populate('connections')

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (req.user.id !== req.params.id){
        const connectionExists = await Connection.find({
            $or : [
                {$and:[{sender: req.user.id}, {recipient:req.params.id}]}, 
                {$and:[{sender: req.params.id}, {recipient:req.user.id}]}
            ]
        })
    
        if (connectionExists.length === 0) {
            res.status(403)
            throw new Error('Request denied, not connected to user')
        }
    
        if (connectionExists.length > 0 && connectionExists[0].status === 'pending') {
            res.status(403)
            throw new Error('Request denied, connection pending')
        }
    }

    

    res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name || null,
        last_name: user.last_name || null,
        phone: user.phone,
        bio: user.bio || null,
        interests: user.interests || null,
        gender: user.gender || null,
        nationality: user.nationality || null,
        itineraries: user.itineraries,
        connections: user.connections
    })
    // res.json({message: 'Get User'})
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const {first_name, last_name, phone, bio, interests, gender, nationality} = req.body

    const allowedfields = {
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        bio: bio,
        interests: interests,
        gender: gender,
        nationality: nationality
    }
    const updatedUser = await User.findByIdAndUpdate(user.id, allowedfields, {new: true})
    res.status(200).json(updatedUser)

    // res.json({message: 'Update User Profile'})
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '2d'
    })
}

module.exports = { createUser, loginUser, getMe, getUser, updateUser }
