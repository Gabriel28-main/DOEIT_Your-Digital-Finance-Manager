import express from 'express'
import { CreateNewCategory, ShowCategory, UpdateCategory, DeleteCategory } from '../controller/allocationController.js'

const allocationRouter = express.Router()

allocationRouter.get('/allocation', ShowCategory)
allocationRouter.post('/allocation', CreateNewCategory)
allocationRouter.put('/allocation/:id', UpdateCategory)
allocationRouter.delete('/allocation/:id', DeleteCategory)

export default allocationRouter