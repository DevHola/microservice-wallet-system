import { pool } from '../config/db'
import { type inAppTransaction } from '../interfaces/interface'
import { balance } from './walletservice'

export const initInAppTransaction = async (data: inAppTransaction): Promise<inAppTransaction> => {
  const inApp = await pool.query('INSERT INTO inapp_transactions (type,amount,initiator_wallet_id,destination_wallet_id,initiator_user_id,destination_user_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id', [data.type, data.amount, data.initiator_wallet_id, data.destination_wallet_id, data.initiator_user_id, data.destination_user_id])
  const transaction = inApp.rows[0] as inAppTransaction
  return transaction
}
export const Transaction = async (data: inAppTransaction, id: string): Promise<void> => {
  try {
    const iuserId = data.initiator_user_id
    const duserId = data.destination_user_id
    if (iuserId != null && duserId != null) {
      const [initBalance, destBalance] = await Promise.all([balance(data.initiator_wallet_id, iuserId), balance(data.destination_wallet_id, duserId)])
      const newInitBalance: number = initBalance.rows[0] - data.amount
      const newDestBalance: number = destBalance.rows[0] + data.amount

      await pool.query('BEGIN')
      await pool.query('UPDATE wallets SET Balance=$1 where wallet_address=$2 AND user_id=$3', [newInitBalance, data.initiator_wallet_id, data.initiator_user_id])
      await pool.query('UPDATE wallets SET Balance=$1 where wallet_address=$2 AND user_id=$3', [newDestBalance, data.destination_wallet_id, data.destination_user_id])
      await pool.query('UPDATE inapp_transactions SET status=$1 WHERE id=$2', ['success', id])
      await pool.query('COMMIT')
    }
  } catch (error) {
    await pool.query('ROLLBACK')
    await pool.query('UPDATE inapp_transactions SET status=$1 WHERE id=$2', ['failed', id])
    throw error
  }
}
export const RequestFunds = async (data: inAppTransaction, id: string): Promise<void> => {
  try {
    const iuserId = data.initiator_user_id
    const duserId = data.destination_user_id
    if (iuserId != null && duserId != null) {
      const [initBalance, destBalance] = await Promise.all([balance(data.initiator_wallet_id, iuserId), balance(data.destination_wallet_id, duserId)])
      const newDestBalance: number = destBalance.rows[0] - data.amount
      const newInitBalance: number = initBalance.rows[0] + data.amount

      await pool.query('BEGIN')
      await pool.query('UPDATE wallets SET Balance=$1 where wallet_address=$2 AND user_id=$3', [newInitBalance, data.initiator_wallet_id, data.initiator_user_id])
      await pool.query('UPDATE wallets SET Balance=$1 where wallet_address=$2 AND user_id=$3', [newDestBalance, data.destination_wallet_id, data.destination_user_id])
      await pool.query('UPDATE inapp_transactions SET status=$1 WHERE id=$2', ['success', id])
      await pool.query('COMMIT')
    }
  } catch (error) {
    await pool.query('ROLLBACK')
    await pool.query('UPDATE inapp_transactions SET status=$1 WHERE id=$2', ['failed', id])
    throw error
  }
}
export const getInAppTransactionById = async (id: string): Promise<inAppTransaction> => {
  const inApp = await pool.query('SELECT id,type,amount,initiator_wallet_id,destination_wallet_id,status FROM inAppTransactions WHERE id=$1', [id])
  const transaction = inApp.rows[0] as inAppTransaction
  return transaction
}
// suceess and failed
export const getAllTransactionBywallet = async (id: string): Promise<inAppTransaction[]> => {
  const inApp = await pool.query('SELECT id,type,amount,initiator_wallet_id,destination_wallet_id,status FROM inAppTransactions WHERE initiator_wallet_id=$1', [id])
  const transactions = inApp.rows[0] as inAppTransaction[]
  return transactions
}
// success only
export const getsuccessfulTransToWallet = async (id: string): Promise<inAppTransaction[]> => {
  const wallettransaction = await pool.query('SELECT id,type,amount,initiator_wallet_id,destination_wallet_id,status FROM inAppTransactions WHERE destination_wallet_id=$1 AND status=$2', [id, 'success'])
  const transactions = wallettransaction.rows as inAppTransaction[]
  return transactions
}

export const getallTransaction = async (): Promise<inAppTransaction[]> => {
  const wallettransaction = await pool.query('SELECT id,type,amount,initiator_wallet_id,destination_wallet_id,status FROM inAppTransactions', [])
  const transaction = wallettransaction.rows as inAppTransaction[]
  return transaction
}

export const transactionStatus = async (id: string, status: string): Promise<void> => {
  await pool.query('UPDATE inAppTransactions SET status=$1 WHERE id=$2', [status, id])
}
