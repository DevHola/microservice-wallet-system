import { body } from 'express-validator/check'

export const walletvalidator = [
  body('name')
    .exists()
    .withMessage('name is required')
    .isString()
    .withMessage('name must be string')
    .isLength({ min: 3 })
    .withMessage('name is required'),
  body('description')
    .isString()
    .withMessage('description must be string')
    .exists()
    .withMessage('description is required')
    .isLength({ min: 3 })
    .withMessage('name is required')
]
