import express from 'express'
import { authUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

// Login a User
router.route('/login').post(authUser)

// Fetch User Profile
router.route('/profile').get(protect, getUserProfile)

export default router
