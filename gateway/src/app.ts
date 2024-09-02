import express, { Application, Request, Response } from "express";
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import helmet from "helmet";
import { createProxyMiddleware} from "http-proxy-middleware";
import { Routes } from "./routes/routes";
import { limiter, authentication } from "./middleware";
import { User } from "./interfaces";
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
            pathRewrite: (path, req) => path.replace(router.route, ''),
            on: {
                proxyReq: (proxyReq, req, res) => {
                    const customReq = req as Request & { user?: User };
                    if (customReq.user) {
                        proxyReq.setHeader('X-User-Id', customReq.user.user_id);
                        proxyReq.setHeader('X-User-Email', customReq.user.email);
                    }
                }
            }
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
        message: "Welcome to Our E-Wallet Service Our e-wallet is designed to provide you with a secure, fast, and convenient way to manage your digital transactions. Powered by QR code technology, our platform allows you to make payments, send and receive money with just a scan, ensuring a seamless experience every time. Whether you're shopping in-store, paying bills, or transferring funds, our e-wallet offers robust security and reliability. Explore a new way to handle your finances with advanced features, all in one user-friendly interface."
    })
} )
app.listen(7000, () => {
    console.log(`Express running on port 7000`)
})
