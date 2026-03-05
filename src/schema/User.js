import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
    default: null
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },

  role: {
    type: String,
    required: false,
    enum: ['user', 'admin'],
    default: 'user',
  },

  permissions: {
    type: Object,
    select: false,
    default: {
      watchAllUsers: { type: Boolean, default: false },
      finance: { type: Boolean, default: false },
      report: { type: Boolean, default: false },
      tourPackage: { type: Boolean, default: false },
      hotels: { type: Boolean, default: false },
      bookings: { type: Boolean, default: false },
    }
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

const User = mongoose.model('User', UserSchema)

export default User