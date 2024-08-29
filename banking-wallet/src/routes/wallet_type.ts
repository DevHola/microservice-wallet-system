/* eslint-disable @typescript-eslint/no-misused-promises */
import { allWalletType, createWalletType, updateWalletType, detailWalletType } from '../controllers/wallet_type'
import { Router } from 'express'
import { walletvalidator } from '../validators'
const wtrouter = Router()
wtrouter.post('/create', walletvalidator, createWalletType)
wtrouter.put('/:id', walletvalidator, updateWalletType)
wtrouter.get('/:id', detailWalletType)
wtrouter.get('/', allWalletType)

export default wtrouter
// https://medium.com/@natnael.awel/how-to-setup-testing-for-typescript-with-express-js-example-83d3efbb6fd4
