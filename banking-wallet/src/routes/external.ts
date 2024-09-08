/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getAllETByWallet, getAllExternalTransaction, getByIdExternalTransaction, getByRefExternalTransaction, initExternalTransactionCredit, initExternalTransactionWithdrawal, verifyTransaction } from '../controllers/external'
import { verifyAccessToken } from '../middleware/verify'
const etrouter = Router()
etrouter.post('/credit', verifyAccessToken, initExternalTransactionCredit)
etrouter.post('/withdrawal', verifyAccessToken, initExternalTransactionWithdrawal)
etrouter.post('/verify-payment', verifyAccessToken, verifyTransaction)
etrouter.get('/:id', getByIdExternalTransaction)
etrouter.get('/ref/:id', getByRefExternalTransaction)
etrouter.get('/wallet/:id', getAllETByWallet)
etrouter.get('/', getAllExternalTransaction)
export default etrouter
