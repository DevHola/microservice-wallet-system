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
  pin: string
  is_blocked: boolean
  is_setup_complete: boolean
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
  ref: string
}
export interface User {
  user_id: string
  email: string | undefined
  usertype?: number
}
