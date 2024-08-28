import { type Request, type Response, type NextFunction } from 'express'
import { validationResult } from 'express-validator/check'
import { initInAppTransaction, Transaction, transactionStatus } from '../services/inapp'
import { type CustomRequest } from '../interfaces/interface'
import { ifbalancehigher } from '../services/walletservice'

export const inAppTransact = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    if (req.user?.user_id != null) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { type, amount, initiator_wallet_id, destination_wallet_id, destination_user_id } = req.body
      const userId = req.user.user_id

      const data = {
        type, amount, initiator_wallet_id, destination_wallet_id, userId, destination_user_id
      }
      const transaction = await initInAppTransaction(data)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const check = await ifbalancehigher(initiator_wallet_id, data.amount, userId)
      if (transaction.id != null) {
        if (check) {
          await Transaction(data, transaction.id)
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

}
export const getAllsingleWalletTrans = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
// getAllTransactionBywallet
// getsuccessfulTransToWallet
}
export const getAllAppTrans = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

}
