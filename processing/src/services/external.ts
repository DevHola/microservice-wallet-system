import { pool } from '../config/db'
import { type externalTransaction } from '../interfaces/interface'

export const createInitExternalTrans = async (data: externalTransaction): Promise<externalTransaction> => {
  console.log(data)
  const init = await pool.query('INSERT INTO external_transactions (type,amount,wallet_id,user_id,ref,address) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id', [data.type, data.amount, data.wallet_id, data.user_id, data.ref, data.address])
  const transaction = init.rows[0] as externalTransaction
  return transaction
}
export const getexttransbyid = async (id: string): Promise<externalTransaction> => {
  const find = await pool.query('SELECT id,type,amount,status,ref,address FROM external_transactions WHERE id=$1', [id])
  const transaction = find.rows[0] as externalTransaction
  return transaction
}
export const gettransbyidforqueue = async (id: string): Promise<externalTransaction> => {
  const find = await pool.query('SELECT id, wallet_id, user_id, type,amount,status,ref,address FROM external_transactions WHERE id=$1', [id])
  const transaction = find.rows[0] as externalTransaction
  return transaction
}
export const getexttransbyref = async (id: string): Promise<externalTransaction> => {
  const find = await pool.query('SELECT type,status,ref FROM external_transactions WHERE ref=$1', [id])
  const transaction = find.rows[0] as externalTransaction
  return transaction
}
export const getallexttransbywallet = async (id: string): Promise<externalTransaction[]> => {
  const find = await pool.query('SELECT type,amount,status,ref FROM external_transactions WHERE wallet_id=$1', [id])
  const transactions = find.rows as externalTransaction[]
  return transactions
}
export const updateextrans = async (id: string, status: string, updatedate: Date): Promise<externalTransaction> => {
  const date = new Date(updatedate)
  const formattedTimestamp = date.toISOString()
  const find = await pool.query('UPDATE external_transactions SET status=$1,updated_at=$2 WHERE id=$3', [status, formattedTimestamp, id])
  const transaction = find.rows[0] as externalTransaction
  return transaction
}
export const updateref = async (id: string, accessCode: any, ref: any): Promise<externalTransaction> => {
  const find = await pool.query('UPDATE external_transactions SET ref=$1, access_code=$2 WHERE id=$3', [ref, accessCode, id])
  const transaction = find.rows[0] as externalTransaction
  return transaction
}
export const getallexttrans = async (): Promise<externalTransaction[]> => {
  const find = await pool.query('SELECT type,amount,wallet_id,status,ref FROM external_transactions')
  const transactions = find.rows as externalTransaction[]
  return transactions
}
