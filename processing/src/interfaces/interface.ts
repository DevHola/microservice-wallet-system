interface transaction {
  id?: string
  type: string
  amount: number
  status?: string
  created_At?: string
  updated_At?: string
}
export interface externalTransaction extends transaction {
  wallet_id: string
  user_id: string
  ref: string
  address: string
}
export interface User {
  user_id: string
  email: string | undefined
  usertype?: number
}
