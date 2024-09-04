/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { authorizeInAppTransact, authorizeInAppTransactRequestFund, getAllAppTrans, getAllsingleWalletTrans, getAppTransbyId, inAppTransact, inAppTransactRequestFund } from '../controllers/inapp'
import { verifyAccessToken } from '../middleware/verify'
const router = Router()
router.post('/transfer', verifyAccessToken, inAppTransact)
router.post('/transfer/authorise/:id', verifyAccessToken, authorizeInAppTransact)
router.post('/requestfunds', verifyAccessToken, inAppTransactRequestFund)
router.post('/requestfunds/authorise/:id', verifyAccessToken, authorizeInAppTransactRequestFund)
router.get('/:id', getAppTransbyId)
router.get('/wallet/:id', getAllsingleWalletTrans)
router.get('/', getAllAppTrans)
export default router
