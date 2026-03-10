import 'dotenv/config.js'

export default {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_URL: process.env.DB_URL,
}

