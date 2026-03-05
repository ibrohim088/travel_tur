import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  hotelId: {
    type: Number,
    required: true,
    unique: true
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

  hotelCheckIn: {
    type: String,
    required: true,
  },

  hotelCheckOut: {
    type: String,
    required: true
  },

  hotelFeedback: [{
    user: String,
    rating: Number,
    comment: String
  }]

}, {
  versionKey: false,
})

const Hotel = mongoose.model('Hotel', HotelSchema)

export default Hotel

/*

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