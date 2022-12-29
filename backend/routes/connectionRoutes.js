const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/auth')

const {createConnection, getConnections, acceptConnection, deleteConnection} = require('../controllers/connectionController')

router.post('/connect/:id', protect, createConnection)
router.get('/', protect, getConnections)
router.put('/accept/:id', protect, acceptConnection)
router.delete('/delete/:id', protect, deleteConnection)

module.exports = router
