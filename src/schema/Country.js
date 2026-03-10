import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
  countryName: {
    type: String,
    required: true,
    default: "Uzbekistan"
  },

  regions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
  }]
}, {
  versionKey: false,
})

const Country = mongoose.model('Country', CountrySchema)

export default Country