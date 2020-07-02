let mongoose = require('../connection')

let Schema = mongoose.Schema
let FarmPrecipitationSchema = new Schema({
  farm_precipitation_id: Number,
  farm_id: Number,
  date: Date,
  precipitation: Number,
})

let FarmPrecipitation = mongoose.model('FarmPrecipitation', FarmPrecipitationSchema)

module.exports = FarmPrecipitation