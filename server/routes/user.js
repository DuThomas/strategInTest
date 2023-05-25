import { register, login, getUsers, deleteUser } from "../controllers/user.js"
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
    check("email", "Email must be valid").isEmail(),
    check("password", "Password should be at least 8 characters").isLength({min: 8})
  ], register)

router
  .route('/login')
  .get((req, res) => {
    return res.status(200).json({
      message: "login page",
    })
  })
  .post(login)

  router
  .route('/update')
  .get((req, res) => {
    return res.status(200).json({
      message: "login page",
    })
  })
  .post(login)

router
  .route('/delete')
  .post(deleteUser)

router
  .route('/users')
  .get(auth, getUsers)

export default router