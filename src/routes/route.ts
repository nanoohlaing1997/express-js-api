import { Request, Response, Express } from "express"
import { body, query, validationResult } from "express-validator"
import { ValidationRules } from '../validation/validation_rules';
import { UserController } from '../controllers/user';

export const Router = (app: Express): void => {
  app.get('/', (req: Request, res: Response) => {
    res.json(
      {
        "message": "testing route"
      }
    )
  })

  app.post('/create/user', ValidationRules.createUserValidationRules(), UserController.create)
}