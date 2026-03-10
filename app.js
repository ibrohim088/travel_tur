import express from 'express'
import cors from 'cors'

import config from './src/shared/config.js'
import db from './src/db/index.js'

import userRouter from './src/routes/user.js'
import countryRouter from './src/routes/country.js'
import cityRouter from './src/routes/city.js'
import hotelRouter from './src/routes/hotel.js'
import tourRouter from './src/routes/tour.js'

import orderRouter from './src/routes/order.js'


const app = express()

app.use(cors({ origin: 'http://localhost:5173' || 'http://localhost:5174' }))

app.use(express.json())

app.use('/users', userRouter)
app.use('/countries', countryRouter)
app.use('/cities', cityRouter)
app.use('/hotels', hotelRouter)
app.use('/tours', tourRouter)
app.use('/orders', orderRouter)

db()
app.listen(config.PORT, () => {
  console.log(`Server is listining on port ${config.PORT}`);
})