import mongoose from "mongoose";

export const CitySchema = new mongoose.Schema({
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },

  cityName: {
    type: String,
    required: true,
    default: "Tashkent"
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

  hotels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel'
  }]
}, {
  versionKey: false,
})

const City = mongoose.model('City', CitySchema)

export default City 