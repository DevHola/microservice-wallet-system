import { Request } from "express"
export interface Decoded {
    user_id: string,
    name: string,
    email: string
}
export interface CustomRequest extends Request {
    user?: Decoded
}
export interface User {
    user_id: string,
    name: string,
    email: string
}