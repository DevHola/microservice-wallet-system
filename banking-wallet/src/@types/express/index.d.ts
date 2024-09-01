// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express'
import { type User } from '../../interfaces/interface'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
