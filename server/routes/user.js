import { register, login, getUsers, deleteUser, updateUser, getUser } from "../controllers/user.js"
import { Router } from "express"
import { check } from 'express-validator'
import auth from '../middleware/auth.js'
const router = Router()

router
  .route('/')
  .get((req, res) => {
    res.status(200).json({
      message: "Homepage"
    })
})
router
  .route('/register')
  .get((req, res) => {
    return res.status(200).json({
      message: "Registration page",
    })
  })
  .post([
    check("email", "Email is required and must be valid").exists().isEmail(),
    check("password", "Password is required and should be at least 8 characters").exists().isLength({min: 8})
  ], register)

router
  .route('/login')
  .get((req, res) => {
    return res.status(200).json({
      message: "login page",
    })
  })
  .post([
    check("email", "Email is required and must be valid").exists().isEmail(),
    check("password", "Password is required and should be at least 8 characters").exists().isLength({min: 8})
  ], login)

  router
  .route('/update')
  .get((req, res) => {
    return res.status(200).json({
      message: "login page",
    })
  })
  .put([
    check("email", "Email is required and must be valid").exists().isEmail(),
    check("newEmail", "New email is required and must be valid").exists().isEmail(),
    check("newPassword", "New password is required and should be at least 8 characters").exists().isLength({min: 8})
  ], updateUser)

router
  .route('/delete')
  .delete(deleteUser)

router
  .route('/users')
  .get(auth, getUsers)
  .post(getUser)

export default router