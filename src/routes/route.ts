import express, { Request, Response, Express } from 'express'
import { ValidationRules } from '../validation/validation_rules'
import { UserController } from '../controllers/user'
import { AuthMiddleware } from '../middlewares/auth'

export const Router = (app: Express): void => {
  // Body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // health check route
  app.get('/health/check', (req: Request, res: Response) => {
    res.json({
      message: 'testing route'
    })
  })

  // Create user route
  app.post(
    '/create/user',
    ValidationRules.createUserValidationRules(),
    UserController.create
  )
  // Login user route
  app.post(
    '/login/user',
    ValidationRules.loginUserValidationRules(),
    UserController.login
  )

  // Auth middleware
  app.use(AuthMiddleware.auth)
  // Get all users route
  app.get('/users', UserController.getAllUsers)
}
