import dotenv from 'dotenv'
import path from 'path'
import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction
} from 'express'
import cors from 'cors'
import morgan from 'morgan'
import wrouter = require('./routes/wallet')
import wtrouter = require('./routes/wallet_type')
dotenv.config({ path: path.join(__dirname, '.env') })

const app: Application = express()
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    error: error.stack
  })
})
app.use('/api/wallet/', wrouter)
app.use('/api/wallet-type/', wtrouter)
export default app
