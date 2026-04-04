import express from 'express'
import { getTransaction, inputTransaction } from '../controller/transactionController.js'

const router = express.Router()

router.get('/cashflow', getTransaction) // Get All Data
router.post('/cashflow', inputTransaction) // Create New Data

export default router   