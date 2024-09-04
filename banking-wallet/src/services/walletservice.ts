import { pool } from '../config/db'
import crypto from 'crypto'
import { type wallet } from '../interfaces/interface'
import Decimal from 'decimal.js'
export const walletCreation = async (userId: string, pin: any, blocked: boolean, setupComplete: boolean, walletType: number = 1): Promise<void> => {
  const balance: number = 0
  const walletAddress: string = '12384nnfdndn'
  await pool.query('INSERT INTO wallets (balance, wallet_address, user_id, wallet_type_id, pin, is_blocked, is_setup_complete) VALUES ($1, $2, $3, $4, $5, $6, $7)', [balance, walletAddress, userId, walletType, pin, blocked, setupComplete])
}

export const walletupdatebalance = async (balance: number, address: string, userId: string): Promise<void> => {
  await pool.query('UPDATE wallets SET balance=$1 where wallet_address=$2 AND user_id=$3', [balance, address, userId])
}

export const completeSetup = async (walletid: string, pin: string): Promise<boolean> => {
  const secret = process.env.AUTH_ACCESS_TOKEN_SECRET
  if (secret != null) {
    const pinhash = crypto.createHmac('sha512', secret).update(pin).digest('hex')
    const wallet = await findWalletToSetup(walletid)
    if (wallet != null) {
      await pool.query('UPDATE wallets SET pin=$1, is_blocked=$2, is_setup_complete=$3 WHERE wallet_id=$4', [pinhash, false, true, wallet.wallet_id])
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export const changeWalletPin = async (walletid: string, pin: string, userid: string): Promise<boolean> => {
  const secret = process.env.AUTH_ACCESS_TOKEN_SECRET
  if (secret != null) {
    const pinhash = crypto.createHmac('sha512', secret).update(pin).digest('hex')
    const wallet = await walletdetailbyid(walletid, userid)
    if (wallet != null) {
      await pool.query('UPDATE wallets SET pin=$1 WHERE wallet_id=$2 AND user_id=$3', [pinhash, wallet.wallet_id, wallet.user_id])
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

const findWalletToSetup = async (walletid: string): Promise<wallet> => {
  const findwallet = await pool.query('SELECT wallet_id, wallet_address FROM wallets WHERE wallet_id=$1 AND is_setup_complete=$2', [walletid, false])
  const wallet = findwallet.rows[0] as wallet
  return wallet
}

export const isblocked = async (walletid: string, userid: string): Promise<boolean> => {
  const findwallet = await pool.query('SELECT is_blocked, is_setup_complete FROM wallets WHERE wallet_id=$1 AND user_id=$2', [walletid, userid])
  const wallet = findwallet.rows[0] as wallet
  if (!wallet.is_blocked && wallet.is_setup_complete) {
    return true
  } else {
    return false
  }
}

export const ifbalancehigher = async (walletid: string, amount: number, userid: string): Promise<boolean> => {
  const findwallet = await pool.query('SELECT balance FROM wallets WHERE wallet_id=$1 AND user_id=$2', [walletid, userid])
  const wallet = findwallet.rows[0] as wallet
  const balance = new Decimal(wallet.balance)
  const amt = new Decimal(amount)
  const checknow: boolean = balance.greaterThan(amt)
  return checknow
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

export const walletdetailbyid = async (walletid: string, userId: string): Promise<wallet> => {
  const findwallet = await pool.query('SELECT balance, wallet_address, is_blocked, is_setup_complete, name FROM wallets INNER JOIN wallet_type ON wallets.wallet_type_id = wallet_type.wallet_type_id WHERE wallets.wallet_id=$1 AND wallets.user_id=$2', [walletid, userId])
  const wallet = findwallet.rows[0] as wallet
  return wallet
}

export const walletdetailbyaddress = async (walletAddress: string): Promise<wallet> => {
  const findwallet = await pool.query('SELECT balance, wallet_address, is_blocked, is_setup_complete, name FROM wallets INNER JOIN wallet_type ON wallets.wallet_type_id = wallet_type.wallet_type_id WHERE wallets.wallet_address=$1', [walletAddress])
  const wallet = findwallet.rows[0] as wallet
  console.log(wallet)
  return wallet
}
export const walletdetailbyuser = async (userId: string): Promise<wallet> => {
  const findwallet = await pool.query('SELECT balance, wallet_address, is_blocked, is_setup_complete, name FROM wallets INNER JOIN wallet_type ON wallets.wallet_type_id = wallet_type.wallet_type_id WHERE wallets.user_id=$1', [userId])
  const wallet = findwallet.rows[0] as wallet
  return wallet
}
export const allWalletByUser = async (userId: string): Promise<wallet[]> => {
  const findwallets = await pool.query('SELECT balance, wallet_address, is_blocked, is_setup_complete, name FROM wallets INNER JOIN wallet_type ON wallets.wallet_type_id = wallet_type.wallet_type_id WHERE wallets.user_id=$1', [userId])
  const wallets = findwallets.rows as wallet[]
  console.log(findwallets)
  return wallets
}
export const WalletBalance = async (walletAddress: string): Promise<wallet> => {
  const findwallet = await pool.query('SELECT balance FROM wallets INNER JOIN wallet_type ON wallets.wallet_type_id = wallet_type.wallet_type_id WHERE wallets.wallet_address = $1', [walletAddress])
  const wallet = findwallet.rows[0] as wallet
  return wallet
}
