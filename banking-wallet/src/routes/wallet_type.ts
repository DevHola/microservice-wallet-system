/* eslint-disable @typescript-eslint/no-misused-promises */
import { allWalletType, createWalletType, updateWalletType, detailWalletType } from '../controllers/wallet_type'
import { Router } from 'express'
const router = Router()
router.post('/walletType', createWalletType)
router.put('/walletType', updateWalletType)
router.get('/wallet/:id', detailWalletType)
router.get('/wallettypes', allWalletType)

export = router
