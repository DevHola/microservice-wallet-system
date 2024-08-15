import { Request } from "express"
export interface Decoded {
    user: string,
    email: string
}
export interface CustomRequest extends Request {
    user?: Decoded
}
