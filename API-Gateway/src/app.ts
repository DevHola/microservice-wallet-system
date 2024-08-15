import express, { Application, Request, Response } from "express";
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import helmet from "helmet";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Routes } from "./routes/routes";
import { limiter, authentication } from "./middleware";
dotenv.config({path: path.join(__dirname, '.env')})
const app: Application = express()
app.use(cors())
app.use(morgan('combined'))
app.use(helmet())
app.disable('x-powered-by')
app.use(limiter)
Routes.forEach(router => {
    if(router.authrequired === true){
        app.use(router.route, authentication , createProxyMiddleware({
            target:router.target,
            changeOrigin: true,
            pathRewrite: (path, req) => path.replace(router.route, '')
        }))
    } else {
        app.use(router.route, createProxyMiddleware({
            target:router.target,
            changeOrigin: true,
            pathRewrite: (path, req) => path.replace(router.route, '')
        }))
    }
    
});
app.get('/', (req: Request,res: Response)=> {
    res.status(200).json({
        message: 'API Gateway'
    })
} )
app.listen(7000, () => {
    console.log(`Express running on port 7000`)
})
