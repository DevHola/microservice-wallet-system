/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { getAllAppTrans, getAllsingleWalletTrans, getAppTransbyId, inAppTransact, inAppTransactRequestFund } from '../controllers/inapp'
const router = Router()
router.post('/transfer', inAppTransact)
router.post('/requestfunds', inAppTransactRequestFund)
router.get('/:id', getAppTransbyId)
router.get('/wallet/:id', getAllsingleWalletTrans)
router.get('/', getAllAppTrans)
export default router
