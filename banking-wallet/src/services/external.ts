import { pool } from '../config/db'
import { type externalTransaction } from '../interfaces/interface'

export const createInitExternalTrans = async (data: externalTransaction): Promise<externalTransaction> => {
  const init = await pool.query('INSERT INTO external_transactions (type,amount,wallet_id,user_id,payment_method,status,ref) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id', [data.type, data.amount, data.wallet_id, data.user_id, data.payment_method, data.status, data.ref])
  const transaction = init.rows[0] as externalTransaction
  return transaction
}
export const getexttransbyid = async (id: string): Promise<externalTransaction> => {
  const find = await pool.query('SELECT type,amount,payment_method,status FROM external_transactions WHERE id=$1', [id])
  const transaction = find.rows[0] as externalTransaction
  return transaction
}
export const getexttransbyref = async (id: string): Promise<externalTransaction> => {
  const find = await pool.query('SELECT type,amount,payment_method,status FROM external_transactions WHERE ref=$1', [id])
  const transaction = find.rows[0] as externalTransaction
  return transaction
}
export const getallexttransbywallet = async (id: string): Promise<externalTransaction[]> => {
  const find = await pool.query('SELECT type,amount,payment_method,status FROM external_transactions WHERE wallet_id=$1', [id])
  const transactions = find.rows as externalTransaction[]
  return transactions
}
export const updateextrans = async (id: string, status: string): Promise<externalTransaction> => {
  const find = await pool.query('UPDATE external_transactions SET status=$1 WHERE id=$2', [status, id])
  const transaction = find.rows[0] as externalTransaction
  return transaction
}
export const getallexttrans = async (): Promise<externalTransaction[]> => {
  const find = await pool.query('SELECT type,amount,wallet_id,payment_method,status FROM external_transactions')
  const transactions = find.rows as externalTransaction[]
  return transactions
}
