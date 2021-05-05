import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

// Register New User
router.route('/').post(registerUser)

// Login a User
router.route('/login').post(authUser)

// Fetch User Profile
router.route('/profile').get(protect, getUserProfile)

export default router
