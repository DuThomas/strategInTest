// import { register, login, getUsers, deleteUser, updateUser } from "../controllers/user.js"
import { Router } from "express"
import { check } from 'express-validator'
import auth from '../middleware/auth.js'
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task.js"
const router = Router()

// router
//   .route('/')
//   .get()

router
  .route('/create')
  .post([
    // check("email", "Email is required and must be valid").exists().isEmail(),
    // check("password", "Password is required and should be at least 8 characters").exists().isLength({min: 8})
  ], createTask)

// router
//   .route('/login')
//   .get((req, res) => {
//     return res.status(200).json({
//       message: "login page",
//     })
//   })
//   .post([
//     check("email", "Email is required and must be valid").exists().isEmail(),
//     check("password", "Password is required and should be at least 8 characters").exists().isLength({min: 8})
//   ], login)

  router
  .route('/update')
  .put([
    // check("email", "Email is required and must be valid").exists().isEmail(),
    // check("newEmail", "New email is required and must be valid").exists().isEmail(),
    // check("newPassword", "New password is required and should be at least 8 characters").exists().isLength({min: 8})
  ], updateTask)

router
  .route('/delete')
  .delete(deleteTask)

router
  .route('/tasks')
  .get(getTasks)

export default router