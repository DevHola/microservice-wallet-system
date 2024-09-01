import { type Request, type Response, type NextFunction } from 'express'
import { validationResult } from 'express-validator/check'
import { getallTransaction, getAllTransactionBywallet, getInAppTransactionById, getsuccessfulTransToWallet, initInAppTransaction, RequestFunds, Transaction, transactionStatus } from '../services/inapp'
import { type User } from '../interfaces/interface'
import { ifbalancehigher } from '../services/walletservice'

// import { ifbalancehigher } from '../services/walletservice'

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
            message: 'Transaction successful'
          })
        } else {
          await transactionStatus(transaction.id, 'failed')
          throw new Error('Transaction failed')
        }
      }
    } else {
      throw new Error('Authentication failed')
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const check: boolean = await ifbalancehigher(destination_wallet_id, data.amount, userId)
      if (transaction.id != null) {
        if (check) {
          await RequestFunds(data, transaction.id)
        } else {
          await transactionStatus(transaction.id, 'failed')
          throw new Error('Transaction failed')
        }
      }
    } else {
      throw new Error('Authentication failed')
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
