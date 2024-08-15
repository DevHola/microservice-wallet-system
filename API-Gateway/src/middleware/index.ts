import { rateLimit } from 'express-rate-limit'
import { Response, NextFunction } from 'express'
import axios from 'axios'
import { CustomRequest, Decoded } from '../interfaces'
export const limiter = rateLimit({
	windowMs: 60 * 1000,
	limit: 20, 
	legacyHeaders: false, 
    message: 'Too many requests, please try again later'
})
export const authentication = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const headers = req.headers.authorization
    if(headers != null) {
        const [header, token] = headers.split(' ')
    if(header === 'Bearer' && token.length === 0){
        res.status(401).json({ message: 'Invalid Access Token' }) 
    }
   try {
    const url = process.env.AVURL as string
    const response = await axios.post(url, null, {
	headers: {
	'authorization': ` Bearer ${token}`}})
     req.user = response.data.user as Decoded
    next()
   } catch (error) {
     if(error instanceof Error){
        res.status(401).json({ message: error.message });
     }
    
   }

    } else{
        res.status(401).json({ message: 'Missing Access Credentials' })
    }
    
}