import { JWTService } from '../services/jwt'
import { UserService } from './../services/user'
import { Request, Response } from 'express'
import { PasswordService } from '../services/password'

export const UserController = {
  create: async (req: Request, res: Response): Promise<void> => {
    // collect user
    const { username, email, password } = req.query
    const userName = String(username)
    const userEmail = String(email)
    const userPassword = String(password)

    // check user already register or not by email
    const existingUser = await UserService.findUserByEmail(userEmail)
    if (existingUser) {
      res.status(406).json({
        message: 'User already registered !!!'
      })
      return
    }

    // check username already taken or not
    const existingUserName = await UserService.findUserByName(userName)
    if (existingUserName) {
      res.status(406).json({
        message: 'Username already taken !!! please use another username'
      })
      return
    }

    // create user and return user obj
    const user = await UserService.create(userName, userEmail, userPassword)
    if (!user) {
      res.status(406).json({
        message: 'User registering fail'
      })
      return
    }

    const token = await JWTService.generateToken(
      user.id.toString(),
      user.name ?? ''
    )
    try {
      res.status(200).json({ token: token })
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    // collect User
    const { email, password } = req.body
    const userEmail = String(email)
    const userPsw = String(password)

    console.log(userEmail)
    const user = await UserService.findUserByEmail(userEmail)
    if (!user) {
      res.status(404).json({
        message: 'User not found !!!'
      })
      return
    }

    const validatedToken = await PasswordService.validatePassword(userPsw, user)

    if (validatedToken) {
      res.status(200).json({
        token: validatedToken
      })
      return
    }
    res.status(406).json({
      message: 'Login failed !!!'
    })
  },

  getAllUsers: async (req: Request, res: Response): Promise<void> => {
    const users = await UserService.findUsers()
    if (users != null && users.length > 0) {
      res.status(200).json(users)
      return
    }
    res.status(404).json({
      message: 'Users not found.!!!'
    })
  }
}
