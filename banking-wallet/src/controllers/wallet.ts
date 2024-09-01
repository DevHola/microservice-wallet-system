/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { validationResult } from 'express-validator/check'
import { type Request, type Response, type NextFunction } from 'express'
import { allWalletByUser, WalletBalance, walletCreation, walletdetailbyaddress } from '../services/walletservice'
import { type User } from '../interfaces/interface'
export const createWallet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    res.status(400).json({
      error: error.array()
    })
  }
  try {
    if ((req.user) != null) {
      const walletType: number = req.body.type
      const user = req.user as User
      const id = user.user_id
      if (id != null) {
        await walletCreation(id, walletType)
        res.status(200).json({
          message: 'wallet created'
        })
      }
    }
  } catch (error) {
    next(error)
  }
}

export const getwalletbyuser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    res.status(400).json({
      error: error.array()
    })
  }
  try {
    const userId: string = req.params.id
    const wallet = await allWalletByUser(userId)
    if (wallet != null) {
      res.status(200).json({
        wallet
      })
    }
  } catch (error) {
    next(error)
  }
}

export const getwalletbyaddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    res.status(400).json({
      error: error.array()
    })
  }
  try {
    const address: string = req.params.id
    const wallet = await walletdetailbyaddress(address)
    if (wallet !== null) {
      res.status(200).json({
        wallet
      })
    }
  } catch (error) {
    next(error)
  }
}

export const balance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    res.status(400).json({
      error: error.array()
    })
  }
  try {
    const address: string = req.params.id
    const balance = await WalletBalance(address)
    res.status(200).json({
      balance
    })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}
