import 'dotenv/config.js'

export default {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_URL: process.env.DB_URL,
  OCTO_URL: process.env.OCTO_API_URL,
  OCTO_MERCHANT: process.env.OCTO_MERCHANT_ID,
  OCTO_SECRET: process.env.OCTO_SECRET_KEY,
}