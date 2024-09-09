/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Request, type Response, type NextFunction } from 'express'
import { validationResult } from 'express-validator/check'
import { createInitExternalTrans, getallexttrans, getallexttransbywallet, getexttransbyid, getexttransbyref, gettransbyidforqueue, updateextrans, updateref } from '../services/external'
import { type User } from '../interfaces/interface'
import { Paystack } from 'paystack-sdk'
import { createMQP2WProducer } from '../config/queue'
const url = process.env.MQCONNECTURL ?? ''
export const initExternalTransactionCredit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    if ((req.user) != null) {
      const user = req.user as User
      const userId = user.user_id
      const { type, amount, walletId, email, address } = req.body
      // const amountinnaira: number = amount * 100
      const data = {
        type, amount, wallet_id: walletId, user_id: userId, ref: '', address
      }
      const externalTransaction = await createInitExternalTrans(data)
      if (externalTransaction.id != null) {
        const secret = process.env.PAYSTACK_SECRET
        if (secret != null) {
          const paystack = new Paystack(secret)
          const params = {
            email,
            amount
          }
          const refdata = await paystack.transaction.initialize(params)
          const ref = refdata.data?.reference
          const accessCode = refdata.data?.access_code
          if (ref != null) {
            await updateref(externalTransaction.id, accessCode, ref)
            res.status(200).json(refdata)
          }
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}

export const verifyTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }
  try {
    const id = req.body.id as string
    const transaction = await gettransbyidforqueue(id)
    if (transaction != null && transaction.status === 'pending') {
      const secret = process.env.PAYSTACK_SECRET
      if (secret != null) {
        const paystack = new Paystack(secret)
        const resdata = await paystack.transaction.verify(transaction.ref)
        if (resdata != null) {
          if (resdata.data?.status === 'success') {
            await updateextrans(id, resdata.data.status, resdata.data.transaction_date)
            // implement add balance to wallet && update balance history
            const queueName: string = 'wallet_payment_queue'
            const exchange: string = 'wallet_payment_exchange'
            const routekey: string = 'wallet_payment_route'
            const processingProducer = await createMQP2WProducer(url, queueName, exchange, routekey)
            const msg = {
              action: 'update_wallet_balance',
              data: {
                transactionid: transaction.id,
                amount: transaction.amount,
                wallet: transaction.address,
                user: transaction.user_id,
                type: transaction.type
              }
            }
            processingProducer(JSON.stringify(msg))
            res.status(200).json({
              status: 'success'
            })
          } else if (resdata.data?.status === 'failed' || resdata.data?.status === 'abandoned') {
            await updateextrans(id, 'failed', resdata.data.transaction_date)
            res.status(200).json({
              status: 'failed'
            })
          } else {
            res.status(200).json({
              status: 'Ongoing'
            })
          }
        }
      }
    }
  } catch (error) {
    next(error)
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
