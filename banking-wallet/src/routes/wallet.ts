/* eslint-disable @typescript-eslint/no-misused-promises */
import { createWallet, balance, getwalletbyuser, getwalletbyaddress, setupComplete } from '../controllers/wallet'
import { Router } from 'express'
import { verifyAccessToken } from '../middleware/verify'

const wrouter = Router()
wrouter.post('/create', verifyAccessToken, createWallet)
wrouter.get('/user/:id', verifyAccessToken, getwalletbyuser)
wrouter.get('/:id', verifyAccessToken, getwalletbyaddress)
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
wrouter.get('/:id/balance', verifyAccessToken, balance)
wrouter.post('/complete/setup/:id', verifyAccessToken, setupComplete)
export default wrouter
