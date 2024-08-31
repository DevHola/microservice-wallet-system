import { type Request } from 'express'
export interface wallet_type {
  wallet_type_id: number
  name: string
  description?: string
  created_At?: string
  updated_At?: string
}
export interface wallet {
  wallet_id?: number
  balance: number
  wallet_address: string
  user_id: string
  wallet_type_id?: number
  created_At?: string
  updated_At?: string
}
interface transaction {
  id?: string
  type: string
  amount: number
  status?: string
  created_At?: string
  updated_At?: string
}
export interface inAppTransaction extends transaction {
  initiator_wallet_id: string
  destination_wallet_id: string
  initiator_user_id?: string
  destination_user_id: string
}
export interface externalTransaction extends transaction {
  wallet_id: string
  user_id: string
  payment_method: string
  ref: string
}
export interface User {
  user_id?: string
  name?: string
  email: string
  usertype?: number
}
export interface CustomRequest extends Request {
  user?: User
}
