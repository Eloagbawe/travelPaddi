const express = require('express')
const router = express.Router()
const { createUser, loginUser, getMe, getUser, updateUser } = require('../controllers/userController')
const { protect } = require('../middleware/auth')

router.post('/create_account', createUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/:id', protect, getUser)
// router.put('/:id', protect, updateUser)
router.put('/update', protect, updateUser)


// router.route('/:id', protect).get(getUser).put(updateUser)

module.exports = router