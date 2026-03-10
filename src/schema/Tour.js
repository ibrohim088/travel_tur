import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
  tourName: {
    type: String,
    required: true
  },

  tourCheckIn: {
    type: Date,
    required: true,
    default: Date.now
  },

  tourCheckOut: {
    type: Date,
    required: true,
    default: Date.now
  },

  tourHotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },

  tourPrice: {
    type: Number,
    required: true,
    min: 0
  },

  tourDescriptions: {
    type: String,
    required: false
  },

  mealPlan: {
    type: String,
    enum: ['RO', 'BB', 'HB', 'FB', 'AI'],
    required: true,
    default: 'BB'
  },
}, {
  versionKey: false
})

const Tour = mongoose.model('Tour', TourSchema)

export default Tour

// Inglizcha atama - Izohi (o'zbekcha)
// RO (Room Only) - Ovqatsiz (faqat xona)
// BB (Bed & Breakfast) - 1 mahal (faqat nonushta)
// HB (Half Board) - 2 mahal (nonushta + kechki ovqat)
// FB (Full Board) - 3 mahal (nonushta + tushlik + kechki ovqat)
// AI (All Inclusive) - Hammasi ichida