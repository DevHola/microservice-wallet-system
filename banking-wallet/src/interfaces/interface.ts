export interface wallet_type {
  wallet_type_id: number
  name: string
  description?: string
  created_At?: string
  updated_At?: string
}
export interface wallet {
  wallet_id: number
  Balance: number
  wallet_address: string
  user_id: string
  wallet_type_id?: number
  created_At?: string
  updated_At?: string
}
