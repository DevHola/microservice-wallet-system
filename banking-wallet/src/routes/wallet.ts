/* eslint-disable @typescript-eslint/no-misused-promises */
import { createWallet, updatebalance, getwallet, balance } from '../controllers/wallet'
import { Router } from 'express'
const router = Router()
router.post('/wallet', createWallet)
router.put('/wallet/', updatebalance)
router.get('/wallet/:id', getwallet)
router.get('/wallet/balance', balance)
export = router
