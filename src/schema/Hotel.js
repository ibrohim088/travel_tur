import mongoose from "mongoose";

export const HotelSchema = new mongoose.Schema({
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

  hotelCheckIn: {
    type: String,
    required: true,
  },

  hotelCheckOut: {
    type: String,
    required: true
  },

}, {
  versionKey: false,
})

const Hotel = mongoose.model('Hotel', HotelSchema)

export default Hotel

/*

hotelFeedback: [{
  user: String,
  rating: Number,
  comment: String
}]

? ==========================================


hotelFeatures: [{
  type: String,
  required: true,
  lowercase: true,
  trim: true
}],

{
  "hotelFeedback": [
    "Very good hotel",
    "Nice service",
    "Clean rooms"
  ]
}

? ==========================================

hotelFeedback: [{
  user: String,
  rating: Number,
  comment: String
}]

{
  "hotelFeedback": [
    {
      "user": "John",
      "rating": 5,
      "comment": "Amazing hotel"
    }
  ]
}

*/