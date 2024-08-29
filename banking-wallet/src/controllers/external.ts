import { type Request, type Response, type NextFunction } from 'express'
import { validationResult } from 'express-validator/check'
import { createInitExternalTrans, getallexttrans, getallexttransbywallet, getexttransbyid, getexttransbyref } from '../services/external'
import { type CustomRequest } from '../interfaces/interface'
import { ifbalancehigher } from '../services/walletservice'
import { transactionStatus } from '../services/inapp'

export const initExternalTransactionCredit = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    if ((req.user?.user_id) != null) {
      const userId = req.user.user_id
      const { type, amount, walletId, paymentMethod } = req.body
      const data = {
        type, amount, wallet_id: walletId, payment_method: paymentMethod, user_id: userId, ref: ''
      }
      const externalTransaction = await createInitExternalTrans(data)
      if (externalTransaction.id != null) {
        // send to processing service using message queue
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}

export const initExternalTransactionWithdrawal = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    if ((req.user?.user_id) != null) {
      const userId = req.user.user_id
      const { type, amount, walletId, paymentMethod } = req.body
      const data = {
        type, amount, wallet_id: walletId, payment_method: paymentMethod, user_id: userId, ref: ''
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const check: boolean = await ifbalancehigher(data.wallet_id, data.amount, userId)
      const externalTransaction = await createInitExternalTrans(data)
      if (externalTransaction.id != null) {
        if (check) {
          // send to processing service using message queue
        } else {
          await transactionStatus(externalTransaction.id, 'failed')
          throw new Error('Transaction failed')
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}

export const getByIdExternalTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    const id = req.params.id
    const ET = await getexttransbyid(id)
    res.status(200).json({
      ET
    })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}

export const getByRefExternalTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    const id = req.params.id
    const ETRef = await getexttransbyref(id)
    res.status(200).json({
      ETRef
    })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}

export const getAllETByWallet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    const id = req.params.id
    const walletETs = await getallexttransbywallet(id)
    res.status(200).json({
      walletETs
    })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}

export const getAllExternalTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    const ETs = await getallexttrans()
    if (ETs != null) {
      res.status(200).json({
        ETs
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}
