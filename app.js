import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

import config from './src/shared/config.js'
import db from './src/db/index.js'
import { getIPv4 } from './src/utilities/network.js'

import userRouter from './src/routes/user.js'
import countryRouter from './src/routes/country.js'
import cityRouter from './src/routes/city.js'
import hotelRouter from './src/routes/hotel.js'
import tourRouter from './src/routes/tour.js'
import orderRouter from './src/routes/order.js'
import octoRouter from './src/routes/octo.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const IP = getIPv4()

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))

app.use(express.json())

app.use('/users', userRouter)
app.use('/countries', countryRouter)
app.use('/cities', cityRouter)
app.use('/hotels', hotelRouter)
app.use('/tours', tourRouter)
app.use('/orders', orderRouter)
app.use('/octo', octoRouter)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

db()
app.listen(config.PORT, () => {
  console.log(`\nServer is listining on port ${config.PORT}`);
  console.log(`Network: http://${IP}:${config.PORT}`);
})
