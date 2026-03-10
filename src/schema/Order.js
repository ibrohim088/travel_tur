  import mongoose from "mongoose";

  const OrderSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: true
    },

    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      required: true
    },

    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true
    },

    detailes: {
      checkInDate: { type: Date, required: true },
      checkOutDate: { type: Date, required: true },
      guestsCount: { type: Number, default: 1 },
      totalPrice: { type: Number, required: true }
    },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    },
    
  }, {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });

  const Order = mongoose.model('Order', OrderSchema);
  export default Order;