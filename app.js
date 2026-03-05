import express from 'express'
import cors from 'cors'
import config from './src/shared/config.js'
import db from './src/db/index.js'
import userRouter from './src/routes/user.js'

const app = express()

app.use(cors({ origin: 'http://localhost:5173' || 'http://localhost:5174' }))

app.use(express.json())

app.use('/users', userRouter)


db()
app.listen(config.PORT, () => {
  console.log(`Server is listining on port ${config.PORT}`);
})