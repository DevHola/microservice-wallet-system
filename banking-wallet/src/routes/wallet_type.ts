/* eslint-disable @typescript-eslint/no-misused-promises */
import { allWalletType, createWalletType, updateWalletType, detailWalletType } from '../controllers/wallet_type'
import { Router } from 'express'
import { walletvalidator } from '../validators'
const router = Router()
router.post('/walletType', walletvalidator, createWalletType)
router.put('/walletType/:id', walletvalidator, updateWalletType)
router.get('/walletType/:id', detailWalletType)
router.get('/wallettypes', allWalletType)

export = router
// https://medium.com/@natnael.awel/how-to-setup-testing-for-typescript-with-express-js-example-83d3efbb6fd4
