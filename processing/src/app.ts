/* eslint-disable import/first */
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '.env') })
import express, { type Request, type Response, type NextFunction, type Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes'

const app: Application = express()
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    errors: error.stack
  })
})
app.use('/api/v1/payment/processing', router)
export default app
