import mongoose from "mongoose";
import HotelSchema from './Hotel.js'

const CountrySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },

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

  hotels: [HotelSchema]

}, {
  versionKey: false,
  timestamps: true
})

const Country = mongoose.model('Country', CountrySchema)

export default Country