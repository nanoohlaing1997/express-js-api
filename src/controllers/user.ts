import { UserService } from './../services/user';
import { Request, Response } from "express"

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
      res.status(406).json(
        {
          "message": "User already registered !!!"
        }
      )
      return
    }

    // create user and return user obj
    const user = await UserService.create(userName, userEmail, userPassword)
    if (!user) {
      res.status(406).json(
        {
          "message": "User registering fail"
        }
      )
      return
    }
    res.status(200).json(user)
  }
}