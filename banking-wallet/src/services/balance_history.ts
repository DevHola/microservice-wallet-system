import { pool } from '../config/db'
import { type Balance_History } from '../interfaces/interface'
export const createBalanceHistory = async (data: Balance_History, walletid: any): Promise<void> => {
  await pool.query('INSERT INTO balance_history (wallet_id,user_id,transaction_id,amount,balance_before,type) VALUES ($1,$2,$3,$4,$5,$6)', [walletid, data.user_id, data.transaction_id, data.amount, data.balance_before, data.type])
}
export const getWalletBH = async (id: string): Promise<Balance_History[]> => {
  const findBH = await pool.query('SELECT amount, balance_before, type, created_at FROM balance_history WHERE wallet_id=$1', [id])
  const balanceHistory = findBH.rows as Balance_History[]
  return balanceHistory
}
