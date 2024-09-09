/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getAllETByWallet, getAllExternalTransaction, getByIdExternalTransaction, getByRefExternalTransaction, initExternalTransactionCredit, verifyTransaction } from '../controllers/external'
import { verifyAccessToken } from '../middleware/verify'
const router = Router()
router.post('/credit', verifyAccessToken, initExternalTransactionCredit)
router.post('/verify-payment', verifyAccessToken, verifyTransaction)
router.get('/:id', verifyAccessToken, getByIdExternalTransaction)
router.get('/ref/:id', verifyAccessToken, getByRefExternalTransaction)
router.get('/wallet/:id', verifyAccessToken, getAllETByWallet)
router.get('/', verifyAccessToken, getAllExternalTransaction)
export default router
