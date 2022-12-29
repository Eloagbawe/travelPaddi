const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/auth')

const {createItinerary, searchItinerary, updateItinerary} = require('../controllers/itineraryController')

router.route('/').post(protect, createItinerary)
router.route('/search').get(protect, searchItinerary)
router.route('/update/:id').put(protect, updateItinerary)



module.exports = router
