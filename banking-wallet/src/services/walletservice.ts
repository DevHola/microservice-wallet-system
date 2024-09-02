import { pool } from '../config/db'
import crypto from 'crypto'
import { type wallet } from '../interfaces/interface'

export const walletCreation = async (userId: string, pin: string, walletType: number = 1): Promise<void> => {
  const balance: number = 0
  const walletAddress: string = '12384nnfdndn5'
  await pool.query('INSERT INTO wallets (balance, wallet_address, user_id, wallet_type_id, pin) VALUES ($1, $2, $3, $4, $5)', [balance, walletAddress, userId, walletType, pin])
}

export const walletupdatebalance = async (balance: number, address: string, userId: string): Promise<void> => {
  await pool.query('UPDATE wallets SET balance=$1 where wallet_address=$2 AND user_id=$3', [balance, address, userId])
}

export const ifbalancehigher = async (walletid: string, amount: number, userid: string): Promise<boolean> => {
  const findwallet = await pool.query('SELECT balance FROM wallets WHERE wallet_id=$1 AND user_id=$2', [walletid, userid])
  const wallet = findwallet.rows[0] as wallet
  if (wallet.balance > amount) {
    return true
  } else {
    return false
  }
}
export const walletpinvalidate = async (pin: string, walletid: string): Promise<boolean> => {
  const secret = process.env.AUTH_ACCESS_TOKEN_SECRET
  if (secret != null) {
    const pinhash = crypto.createHmac('sha512', secret).update(pin).digest('hex')
    const findwallet = await pool.query('SELECT pin FROM wallets WHERE wallet_id=$1', [walletid])
    const wallet = findwallet.rows[0] as wallet
    if (wallet.pin === pinhash) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export const balance = async (walletid: string, userid: string): Promise<wallet> => {
  const findwallet = await pool.query('SELECT balance FROM wallets WHERE wallet_id=$1 AND user_id=$2', [walletid, userid])
  return findwallet.rows[0] as wallet
}

export const walletdetailbyaddress = async (walletAddress: string): Promise<wallet> => {
  const findwallet = await pool.query('SELECT balance, wallet_address, name FROM wallets INNER JOIN wallet_type ON wallets.wallet_type_id = wallet_type.wallet_type_id WHERE wallets.wallet_address=$1', [walletAddress])
  const wallet = findwallet.rows[0] as wallet
  console.log(wallet)
  return wallet
}
export const walletdetailbyuser = async (userId: string): Promise<wallet> => {
  const findwallet = await pool.query('SELECT balance, wallet_address, name FROM wallets INNER JOIN wallet_type ON wallets.wallet_type_id = wallet_type.wallet_type_id WHERE wallets.user_id=$1', [userId])
  const wallet = findwallet.rows[0] as wallet
  return wallet
}
export const allWalletByUser = async (userId: string): Promise<wallet[]> => {
  const findwallets = await pool.query('SELECT balance, wallet_address, name FROM wallets INNER JOIN wallet_type ON wallets.wallet_type_id = wallet_type.wallet_type_id WHERE wallets.user_id=$1', [userId])
  const wallets = findwallets.rows as wallet[]
  console.log(findwallets)
  return wallets
}
export const WalletBalance = async (walletAddress: string): Promise<wallet> => {
  const findwallet = await pool.query('SELECT balance FROM wallets INNER JOIN wallet_type ON wallets.wallet_type_id = wallet_type.wallet_type_id WHERE wallets.wallet_address = $1', [walletAddress])
  const wallet = findwallet.rows[0] as wallet
  return wallet
}
