import mongoose from "mongoose";

export const HotelSchema = new mongoose.Schema({
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },

  hotelName: {
    type: String,
    required: true,
  },

  hotelRating: {
    type: Number,
    required: false
  },

  hotelFeatures: [{
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }],

  hotelLocation: {
    lat: {
      type: Number,
      required: true,
      default: 41.330269
    },

    long: {
      type: Number,
      required: true,
      default: 69.279699
    }
  },

  hotelPrice: {
    type: Number,
    required: true,
    default: 0
  },
}, {
  versionKey: false,
})

const Hotel = mongoose.model('Hotel', HotelSchema)

export default Hotel