const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization &&
       req.headers.authorization.startsWith('Bearer'))
       {
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password').populate({path: 'connections'}).populate('itineraries')
            next()
        } catch (err){
            res.status(401)

            if (err.message === 'invalid signature' || err.message === 'invalid token')
            {
                throw new Error('invalid token')
            }
            if (err.message === 'jwt expired')
            {
                throw new Error('session expired')
            } else {
                throw new Error('Not authorized')
            }
        }
       }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }
