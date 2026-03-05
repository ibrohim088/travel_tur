import mongoose from "mongoose";
import config from '../shared/config.js'

async function db() {
  return await mongoose.connect(`${config.DB_URL}`)
    .then(() => {
      console.log('DB is connect!')
    })
    .catch((err) => {
      console.log('DB err: ', err)
    })
}

export default db