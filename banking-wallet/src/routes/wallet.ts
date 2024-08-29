/* eslint-disable @typescript-eslint/no-misused-promises */
import { createWallet, balance, getwalletbyuser, getwalletbyaddress } from '../controllers/wallet'
import { Router } from 'express'
const wrouter = Router()
wrouter.post('/create', createWallet)
wrouter.get('/user/:id', getwalletbyuser)
wrouter.get('/:id', getwalletbyaddress)
wrouter.get('/:id/balance', balance)
export default wrouter
