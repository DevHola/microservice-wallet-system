import { Request } from "express"
export interface Decoded {
    user_id: string,
    name: string,
    email: string
}

export interface User {
    user_id: string,
    name: string,
    email: string
}