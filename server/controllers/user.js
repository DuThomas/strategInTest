import User from "../models/user.js"
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

export const register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg
    })
  }

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(409).json({
        error: "Email is already used"
      })
    }

    const newUser = new User({
      email,
      password
    })

    const savedUser = await newUser.save()
    return res.status(201).json({
      message: "User registered successfully",
      newUser: savedUser
    })

  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
}


export const login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg
    })
  }

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        error: "Email not found"
      })
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      })
    }
    const cookieOptions = {
      expire: new Date() + 60 * 60 * 1000, // expiration time of 1 hour
      httpOnly: true
    }
    const jwtToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    
    return res.status(200).cookie('token', jwtToken, cookieOptions).json({
      jwtToken
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
}


export const updateUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg
    })
  }

  const { email, newEmail, newPassword } = req.body
  try {
    const userWithSameNewEmail = await User.findOne({ email: newEmail})
    if (userWithSameNewEmail) {
      return res.status(400).json({
        error: "New email is already used"
      })
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
  
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { email: newEmail, password: newPassword },
      { new: true } // updated user will be returned
    )
    if (!updatedUser) {
      return res.status(404).json({
        error: 'Email not found'
      })
    }

    return res.status(200).json({
      message: 'User\'s data updated successfully',
      updatedUser: updatedUser
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
}


export const deleteUser = async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({
      error: 'Email is required',
    })
  }

  try {
    const deletedUser = await User.findOneAndDelete({ email })

    if(!deletedUser){
      return res.status(404).json({
        error: 'Email not found',
      })
    }
    return res.status(200).json({
      message: 'User deleted successfully',
      deletedUser: deletedUser,
    }) 
  } catch(error) {
    return res.status(400).json({
      error: error
    })
  }
}


export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    const emails = users.map(user => user.email)

    return res.status(200).json({
      message: 'Success',
      emails
    })
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
}