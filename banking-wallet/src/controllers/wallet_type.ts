import { type Request, type Response, type NextFunction } from 'express'
import { wtAll, wtCreate, wtdetail, wtUpdate } from '../services/wallet_type'
import { validationResult } from 'express-validator/check'

export const createWalletType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array()
      })
    }
    const name = req.body.name as string
    const desc = req.body.description as string
    await wtCreate(name, desc)
    res.status(201).json({
      message: 'wallet created'
    })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'wallet type already exists') { res.status(409).json({ errors: 'wallet type already exists' }) }
    } else {
      next(error)
    }
  }
}

export const updateWalletType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(409).json({
        errors: errors.array()
      })
    }
    const id = parseInt(req.params.id)
    const name = req.body.name as string
    const desc = req.body.description as string
    await wtUpdate(name, desc, id)
    res.status(201).json({
      message: 'updated'
    })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}
export const detailWalletType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(409).json({
        errors: errors.array()
      })
    }
    const id = parseInt(req.params.id)
    const wtype = await wtdetail(id)

    res.status(201).json({
      walletType: wtype
    })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'wallet type not found') {
        res.status(404).json({
          message: 'wallet type not found'
        })
      } else {
        next(error)
      }
    }
  }
}

export const allWalletType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const all = await wtAll()
    res.status(201).json({
      wallet_Types: all
    })
  } catch (error) {
    next(error)
  }
}
