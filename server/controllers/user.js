import User from "../models/user.js"
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import user from "../models/user.js"

function validateCredentials(email, password){
  const user = new User(email, password)
  User.findOne({ email, password })
  .then((user) => {
    if(!user) {
      return res.status(404).json({
        error: "Wrong email or password"
      })
    }
    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      })
    }

    const cookieOptions = {
      expire: new Date() + 60 * 60 * 1000, // expiration time of 1 hour
      httpOnly: true
    }
    const jwtToken = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    return res.status(200).cookie('token', jwtToken, cookieOptions).json({
      jwtToken
    })
  })
  .catch(error => {
    return res.status(400).json({
      error: error
    })
  })
}

export const register = (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg
    })
  }

  const newUser = new User(req.body)
  User.findOne({ email: newUser.email })
  .then(user => {
    if(user) {
      return res.status(409).json({
        error: "Email is already used"
      })
    }

    newUser.save()
    .then(newUser => {
      return res.status(201).json({
        message: "Success",
        newUser
      })
    })
    .catch(error => {
      return res.status(400).json({
        error: "Unable to register"
      })
    })
  })
}

export const login = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email })
  .then(user => {
    if(!user) {
      return res.status(404).json({
        error: "Email not found"
      })
    }
    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      })
    }

    const cookieOptions = {
      expire: new Date() + 60 * 60 * 1000, // expiration time of 1 hour
      httpOnly: true
    }
    const jwtToken = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    return res.status(200).cookie('token', jwtToken, cookieOptions).json({
      jwtToken
    })
  })
  .catch(error => {
    return res.status(400).json({
      error: error
    })
  })
}

export const getUsers = (req, res) => {
  User.find()
  .then((users) => {
    const emails = users.map(user => user.email)
    return res.status(200).json({
      message: 'Success',
      emails
    })
  })
  .catch((error) => {
    return res.status(400).json({
      error: 'Error',
    })
  })
}

export const updateUser = (req, res) => {
  const {email, newEmail, newPassword} = req.body
  User.findOne({ email })
  .then(user => {
    if(!user) {
      return res.status(404).json({
        error: "Email not found"
      })
    }
    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      })
    }

    const cookieOptions = {
      expire: new Date() + 60 * 60 * 1000, // expiration time of 1 hour
      httpOnly: true
    }
    const jwtToken = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    return res.status(200).cookie('token', jwtToken, cookieOptions).json({
      jwtToken
    })
  })
  .catch(error => {
    return res.status(400).json({
      error: error
    })
  })
}

export const deleteUser = (req, res) => {
  const { email } = req.body

  if(!email){
    return res.status(400).json({
      error: 'Email is required',
    })
  }

  User.findOneAndDelete({ email: email })
  .then((deletedUser) => {
    // Document supprimé avec succès
    if(deletedUser){
      return res.status(200).json({
        message: 'User successfully deleted',
        deletedUser: deletedUser,
      })
    }
    else{
      return res.status(404).json({
        error: 'Email not found',
      })
    }
  })
  .catch((error) => {
    return res.status(400).json({ error: error })
  })
}