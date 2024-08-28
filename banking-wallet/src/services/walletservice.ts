import { type QueryResult } from 'pg'
import { pool } from '../config/db'
import { type wallet } from '../interfaces/interface'

export const walletCreation = async (userId: string, walletType: number = 1): Promise<void> => {
  const balance: number = 0
  const walletAddress: string = '12384nnfdndn'
  await pool.query('INSERT INTO wallets (Balance, wallet_address, user_id, wallet_type_id) VALUES ($1, $2, $3, $4)', [balance, walletAddress, userId, walletType])
}

export const walletupdatebalance = async (balance: number, address: string, userId: string): Promise<void> => {
  await pool.query('UPDATE wallets SET Balance=$1 where wallet_address=$2 AND user_id=$3', [balance, address, userId])
}

export const ifbalancehigher = async (walletAddress: string, amount: number, userid: string): Promise<boolean> => {
  const findwallet = await pool.query('SELECT Balance FROM wallets WHERE wallet_address=$1 AND user_id=$2', [walletAddress, userid])
  const wallet = findwallet.rows[0] as wallet
  if (wallet.Balance > amount) {
    return true
  } else {
    return false
  }
}

export const balance = async (walletAddress: string, userid: string): Promise<QueryResult> => {
  const findwallet = await pool.query('SELECT Balance FROM wallets WHERE wallet_address=$1 AND user_id=$2', [walletAddress, userid])
  return findwallet.rows[0]
}

export const walletdetailbyaddress = async (walletAddress: string): Promise<wallet> => {
  const findwallet = await pool.query('SELECT Balance, wallet_address, name FROM wallets INNER JOIN wallet_type ON wallets.wallet_type_id = wallet_type.wallet_id WHERE wallets.wallet_address=$1', [walletAddress])
  const wallet = findwallet.rows[0] as wallet
  return wallet
}
export const walletdetailbyuser = async (userId: string): Promise<wallet> => {
  const findwallet = await pool.query('SELECT Balance, wallet_address, name FROM wallets INNER JOIN wallet_type ON wallets.wallet_type_id = wallet_type.wallet_id WHERE wallets.user_id=$1', [userId])
  const wallet = findwallet.rows[0] as wallet
  return wallet
}
export const allWalletByUser = async (userId: string): Promise<wallet[]> => {
  const findwallets = await pool.query('SELECT Balance, wallet_address, name FROM wallets INNER JOIN wallet_type ON wallets.wallet_type_id = wallet_type.wallet_id WHERE wallets.user_id=$1', [userId])
  const wallets = findwallets.rows as wallet[]
  return wallets
}
export const WalletBalance = async (walletAddress: string): Promise<wallet> => {
  const findwallet = await pool.query('SELECT Balance FROM wallets INNER JOIN wallet_type ON wallets.wallet_type_id = wallet_type.wallet_id WHERE wallets.wallet_address = $1', [walletAddress])
  const wallet = findwallet.rows[0] as wallet
  return wallet
}
