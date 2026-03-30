import mongoose from "mongoose";
import config from '../shared/config.js'
import dns from 'node:dns'

dns.setServers(['1.1.1.1', '8.8.8.8'])
async function db() {
  return await mongoose.connect(config.DB_URL, {
    ssl: true,
    tls: true,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })
    .then(() => {
      console.log('DB is connect!')
    })
    .catch((err) => {
      console.log('DB err: ', err)
      throw err
    })
}

export default db