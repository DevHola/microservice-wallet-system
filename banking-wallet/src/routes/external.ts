/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getAllETByWallet, getAllExternalTransaction, getByIdExternalTransaction, getByRefExternalTransaction, initExternalTransactionCredit, initExternalTransactionWithdrawal } from '../controllers/external'
const etrouter = Router()
etrouter.post('/credit', initExternalTransactionCredit)
etrouter.post('/withdrawal', initExternalTransactionWithdrawal)
etrouter.get('/:id', getByIdExternalTransaction)
etrouter.get('/ref/:id', getByRefExternalTransaction)
etrouter.get('/wallet/:id', getAllETByWallet)
etrouter.get('/', getAllExternalTransaction)
export default etrouter
