import mongoose from "mongoose";
import { CitySchema } from "./City.js";

const CountrySchema = new mongoose.Schema({

  countryName: {
    type: String,
    required: true
  },

  // regions: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Region"
  // }] 
  regions: [CitySchema]
}, {
  versionKey: false,
})

const Country = mongoose.model('Country', CountrySchema)

export default Country