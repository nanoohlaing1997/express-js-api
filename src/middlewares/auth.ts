import { Request, Response } from 'express'
import { JWTService } from '../services/jwt'
export const AuthMiddleware = {
  auth: (req: Request, res: Response, next: Function) => {
    const token = req.header('Authorization')
    if (token == '' || token == null) {
      console.log('Token is empty')
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    const isToken = JWTService.validateToken(String(token))
    if (isToken) {
      console.log('Token is valid')
      next()
    } else {
      console.log('Token is invalid')
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
  }
}
