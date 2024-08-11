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
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
