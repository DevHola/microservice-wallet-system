/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable import/first */
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(__dirname, '.env') })
import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction
} from 'express'
import cors from 'cors'
import morgan from 'morgan'
import wrouter from './routes/wallet'
import wtrouter from './routes/wallet_type'
import router from './routes/inapp'
import { createWalletOnSignup, updateWalletAndBalanceHistory } from './controllers/queue'
import passport from 'passport'

const app: Application = express()
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())
app.use(passport.initialize())
app.use(express.urlencoded({ extended: true }))
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    error: error.stack
  })
})
app.use('/api/v1/wallet', wrouter)
app.use('/api/v1/wallet-type', wtrouter)
app.use('/api/v1/iTransaction', router)

createWalletOnSignup()
updateWalletAndBalanceHistory()
export default app
