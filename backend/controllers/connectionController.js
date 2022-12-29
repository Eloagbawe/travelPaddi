const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Connection = require('../models/connectionModel')

const createConnection = asyncHandler(async (req, res) => {
    const recipient = await User.findById(req.params.id)

    if (!recipient) {
        res.status(404)
        throw new Error('Requested user not found')
    }
    if (req.user.id == req.params.id){
        res.status(400)
        throw new Error('Cannot connect to self')
    }
    const connectionExists = await Connection.find({
        $or : [
            {$and:[{sender: req.user.id}, {recipient:req.params.id}]}, 
            {$and:[{sender: req.params.id}, {recipient:req.user.id}]}
        ]
    })

    if (connectionExists.length > 0) {
        res.status(400)
        throw new Error('Connection already exists!')

    }


    const connectRequest = await Connection.create({
        sender: req.user.id,
        recipient: req.params.id,
        status: 'pending'
    })
    const sender = await User.findById(req.user.id)
    sender.connections.push(connectRequest._id)
    await sender.save()
    recipient.connections.push(connectRequest._id)
    await recipient.save()

    res.status(200).json(connectRequest)
})

const acceptConnection = asyncHandler(async (req, res) => {
    const connection = await Connection.findById(req.params.id)

    if (!connection) {
        res.status(400)
        throw new Error('Connection not found')
    }

    if (connection.sender === req.user.id) {
        res.status(400)
        throw new Error('Sender can not accept request')
    }

    if (connection.recipient !== req.user.id) {
        res.status(403)
        throw new Error('Request denied')
    }

    const updatedConnection = await Connection.findByIdAndUpdate(req.params.id, {status: 'accepted'}, {new: true})
    res.status(200).json(updatedConnection)
    // res.status(200).json({message: 'get connections'})
})

const deleteConnection = asyncHandler(async (req, res) => {
    const connection = await Connection.findById(req.params.id)

    if (!connection) {
        res.status(400)
        throw new Error('Connection not found')
    }
    const sender = await User.findById(connection.sender)
    const recipient = await User.findById(connection.recipient)

    if ((req.user.id !== sender.id) && (req.user.id !== recipient.id)) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const senderCI = sender.connections.indexOf(connection.id)
    const recipientCI = recipient.connections.indexOf(connection.id)

    sender.connections.splice(senderCI, 1)
    sender.save()

    recipient.connections.splice(recipientCI, 1)
    recipient.save()
    await connection.remove()
    res.status(200).json({id: req.params.id})
})

const getConnections = asyncHandler(async (req, res) => {
    // const query1 = {path: 'sender', select: '-password -goals -itineraries -connections -__v', match: {_id: {$ne: req.user.id}}}
    // const query2 = {path: 'recipient', select: '-password -goals -itineraries -connections -__v', match: {_id: {$ne: req.user.id}}}

    const senderQuery = {path: 'sender', select: '-password -goals -itineraries -connections -__v'}
    const recipientQuery = {path: 'recipient', select: '-password -goals -itineraries -connections -__v'}

    const connections = await Connection.find({$or:[{sender: req.user.id}, {recipient: req.user.id}]}).populate(senderQuery).populate(recipientQuery)

    res.status(200).json(connections)
})

module.exports = {createConnection, getConnections, acceptConnection, deleteConnection}
