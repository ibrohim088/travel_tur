import express from 'express'
import cors from 'cors'

import config from './src/shared/config.js'
import db from './src/db/index.js'

import userRouter from './src/routes/user.js'
import hotelRouter from './src/routes/hotel.js'
import cityRouter from './src/routes/city.js'
import countryRouter from './src/routes/country.js'
import orderRouter from './src/routes/order.js'

const app = express()

app.use(cors({ origin: 'http://localhost:5173' || 'http://localhost:5174' }))

app.use(express.json())

app.use('/users', userRouter)
app.use('/hotels', hotelRouter)
app.use('/cities', cityRouter)
app.use('/countries', countryRouter)
app.use('/orders', orderRouter)

db()
app.listen(config.PORT, () => {
  console.log(`Server is listining on port ${config.PORT}`);
})