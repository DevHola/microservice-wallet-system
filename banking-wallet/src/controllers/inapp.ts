import { type Request, type Response, type NextFunction } from 'express'
import { validationResult } from 'express-validator/check'
import { getallTransaction, getAllTransactionBywallet, getInAppTransactionById, getPendingInAppTransactionById, getsuccessfulTransToWallet, initInAppTransaction, RequestFunds, Transaction, transactionStatus } from '../services/inapp'
import { type User } from '../interfaces/interface'
import { ifbalancehigher, walletpinvalidate } from '../services/walletservice'
export const inAppTransact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    if (req.user != null) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { type, amount, initiator_wallet_id, destination_wallet_id, destination_user_id } = req.body
      const user = req.user as User
      const userId = user.user_id
      const data = {
        type, amount, initiator_wallet_id, destination_wallet_id, initiator_user_id: userId, destination_user_id
      }
      const transaction = await initInAppTransaction(data)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const check: boolean = await ifbalancehigher(initiator_wallet_id, data.amount, userId)
      if (transaction.id != null) {
        if (check) {
          await Transaction(data, transaction.id)
          res.status(200).json({
            message: 'Proceed to Authorise Transaction',
            transaction: transaction.id
          })
        } else {
          await transactionStatus(transaction.id, 'failed')
          res.status(401).json({
            message: 'Transaction Failed due to insufficient balance'
          })
        }
      }
    } else {
      throw new Error('Authentication failed')
    }
  } catch (error) {
    next(error)
  }
}

export const authorizeInAppTransact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    const transactionid = req.params.id
    const walletpin = req.body.pin as string
    const transaction = await getPendingInAppTransactionById(transactionid)
    const transinitiator = transaction.initiator_wallet_id
    const transid = transaction.id
    const transinitiatorUserid = transaction.initiator_user_id
    if (transinitiator !== null && transid != null && transinitiatorUserid != null) {
      const check: boolean = await ifbalancehigher(transaction.initiator_wallet_id, transaction.amount, transinitiatorUserid)
      const validatepin: boolean = await walletpinvalidate(walletpin, transinitiator)
      if (validatepin && check) {
        await Transaction(transaction, transid)
        res.status(200).json({
          message: 'Transaction successful'
        })
      } else {
        await transactionStatus(transid, 'failed')
        res.status(401).json({
          message: 'Transaction Failed due to Incorrect Wallet Pin'
        })
      }
    }
  } catch (error) {
    next(error)
  }
}

export const inAppTransactRequestFund = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    if (req.user != null) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { type, amount, initiator_wallet_id, destination_wallet_id, destination_user_id } = req.body
      const user = req.user as User
      const userId = user.user_id

      const data = {
        type, amount, initiator_wallet_id, destination_wallet_id, initiator_user_id: userId, destination_user_id
      }
      const transaction = await initInAppTransaction(data)
      const transactionid = transaction.id
      if (transactionid != null) {
        // await RequestFunds(data, transactionid)
        res.status(200).json({
          message: 'Sent. Awaiting Destination Wallet Authorization.'
        })
      }
    } else {
      throw new Error('Authentication failed')
    }
  } catch (error) {
    next(error)
  }
}

export const authorizeInAppTransactRequestFund = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    const transactionid = req.params.id
    const walletpin = req.body.pin as string
    const transaction = await getPendingInAppTransactionById(transactionid)
    const userId = transaction.destination_user_id
    const transid = transaction.id
    const walletid = transaction.destination_wallet_id
    if (walletid !== null && transid != null && userId != null) {
      const check: boolean = await ifbalancehigher(walletid, transaction.amount, userId)
      const validatepin: boolean = await walletpinvalidate(walletpin, walletid)
      if (validatepin && check) {
        await RequestFunds(transaction, transid)
        res.status(200).json({
          message: 'Transaction successful'
        })
      } else {
        await transactionStatus(transid, 'failed')
        res.status(401).json({
          message: 'Transaction Failed due to Incorrect Wallet Pin or Insufficient Balance'
        })
      }
    }
  } catch (error) {
    next(error)
  }
}

export const getAppTransbyId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    const id: string = req.params.id
    const transaction = await getInAppTransactionById(id)
    res.status(200).json({
      transaction
    })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}
export const getAllsingleWalletTrans = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    const walletId = req.params.id
    const [allTransInitBywallet, allSuccessTransTowallet] = await Promise.all([getAllTransactionBywallet(walletId), getsuccessfulTransToWallet(walletId)])
    const mergedTransaction = [...allTransInitBywallet, allSuccessTransTowallet]
    res.status(200).json({
      mergedTransaction
    })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
  // getAllTransactionBywallet
// getsuccessfulTransToWallet
}
export const getAllAppTrans = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    const transactions = await getallTransaction()
    res.status(200).json({
      transactions
    })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}
