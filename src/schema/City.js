import mongoose from "mongoose";
import { HotelSchema } from './Hotel.js'

export const CitySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },

  location: {
    lat: {
      type: Number,
      required: true,
      default: 41.3775
    },

    long: {
      type: Number,
      required: true,
      default: 64.5853
    }
  },

  // hotels: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Hotel'
  // }]
  hotels: [{ HotelSchema }]
}, {
  versionKey: false,
})

const City = mongoose.model('City', CitySchema)

export default City 