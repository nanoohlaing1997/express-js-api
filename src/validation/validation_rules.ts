import { body, query } from 'express-validator'

export const ValidationRules = {
  createUserValidationRules: () => [
    query('email')
      .notEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .withMessage('Email format is wrong'),
    query('username')
      .notEmpty()
      .withMessage('Username is required')
      .trim()
      .withMessage('Username must not be empty'),
    query('password')
      .notEmpty()
      .withMessage('Password is required')
      .trim()
      .withMessage('Password must not be empty')
  ],
  // loginUserValidationRules: () => [
  //   query('email')
  //     .notEmpty()
  //     .withMessage('Email is required')
  //     .trim()
  //     .isEmail()
  //     .withMessage('Email format is wrong'),
  //   query('password')
  //     .notEmpty()
  //     .withMessage('Password is required')
  //     .trim()
  //     .withMessage('Username must not be empty')
  // ]
  loginUserValidationRules: () => [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .withMessage('Email format is wrong'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .trim()
      .withMessage('Password must not be empty')
  ]
}
