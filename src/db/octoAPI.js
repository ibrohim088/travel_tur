import axios from "axios";
import https from 'https'
import Payment from "../schema/Payment.js";
import config from '../shared/config.js'

const OCTO_API_URL = config.OCTO_URL;
const MERCHANT_ID = config.OCTO_MERCHANT;
const SECRET_KEY = config.OCTO_SECRET;

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

export const createOctoPayment = async ({ orderId, amount, description }) => {
  try {
    const payload = {
      octo_shop_id: MERCHANT_ID,
      octo_secret: SECRET_KEY,
      shop_transaction_id: String(orderId),
      auto_capture: true,
      test: true,
      init_time: new Date()
        .toISOString()
        .replace('T', ' ')
        .replace(/\..+/, ''),
      total_sum: amount,
      currency: "UZS",
      description: description || "Test to'lov",
      return_url: "http://localhost:3000/success",
      notify_url: "http://localhost:3000/octo-webhook"
    };

    console.log('Octo ga yuborilingan payload: ', payload);

    const { data } = await axios.post(OCTO_API_URL, payload, { httpsAgent })

    console.log('Octo dan kelgan Javob: ', data);

    if (data.error === 0) {
      const responseData = data.data || data

      await Payment.create({
        orderId,
        amount,
        payment_url: responseData.octo_pay_url,
        octo_payment_uuid: responseData.octo_payment_UUID,
        status: 'pending',
      })

      return {
        payment_url: responseData.octo_pay_url,
        octo_payment_uuid: responseData.octo_payment_UUID,
        status: 'pending',
      }
    } else {
      const eMsg = data.errMessage || data.errorMessage || data.status
      throw new Error(`Octo xatoligi: ${eMsg}`)
    }
  } catch (error) {
    if (error.response) {
      throw new Error(`Octo API xatosi: ${JSON.stringify(error.response.data)}`)
    }
    throw error
  }
}