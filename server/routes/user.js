import { register, login, getUsers, deleteUser, updateUser, getUser } from "../controllers/user.js"
import { Router } from "express"
import { check } from 'express-validator'
import auth from '../middleware/auth.js'
const router = Router()

router
  .route('/')
  .post([
    check("email", "Email is required and must be valid").exists().isEmail(),
    check("password", "Password is required and should be at least 8 characters").exists().isLength({ min: 8 })
  ], register)
  .put([
    check("_id", "User ID is required").exists(),
    check("newEmail", "New email is required and must be valid").exists().isEmail(),
    check("newPassword", "New password is required and should be at least 8 characters").exists().isLength({ min: 8 })
  ], updateUser)
  .delete(deleteUser)

router
  .route('/login')
  .get((req, res) => {
    return res.status(200).json({
      message: "login page",
    })
  })
  .post([
    check("email", "Email is required and must be valid").exists().isEmail(),
    check("password", "Password is required and should be at least 8 characters").exists().isLength({ min: 8 })
  ], login)

router
  .route('/users')
  .get(auth, getUsers)
  .post(getUser)

export default router