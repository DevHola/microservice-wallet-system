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
        const token = headers.split(' ')[1]
    if(token.length === 0){
        res.status(401).json({ message: 'Invalid Access Token' }) 
    }
   try {
    //NOT COMPLETED
    const response = await axios.post('/',{
	headers: {
	'Authorization': 'Bearer '+ token }})
    req.user = response.data.user as Decoded
    next()
   } catch (error) {
     res.status(401).json({ message: 'Unauthorized: Invalid Token' });
    
   }

    } else{
        res.status(401).json({ message: 'Missing Access Credentials' })
    }
    
}