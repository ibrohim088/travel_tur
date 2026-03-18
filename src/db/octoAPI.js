import axios from "axios";
import https from 'https'
import Payment from "../schema/Payment.js";

const OCTO_API_URL = 'https://secure.octo.uz/prepare_payment';
const MERCHANT_ID = "42422";
const SECRET_KEY = "16a1ab48-a2bb-4c52-928b-d24411b41382";

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

      // ✅ To'g'ri key nomlar
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