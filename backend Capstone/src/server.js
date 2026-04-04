import express from 'express'
import router from './routes/transactionRouter.js'
import allocationRouter from './routes/allocationRouter.js'

const app = express()

const port = 5000
app.use(express.json())

app.use(express.json())
app.use('/', router)
app.use('/', allocationRouter)



app.listen(port, () => {
    console.log(`server berjalan di http://localhost:${port}`)
})