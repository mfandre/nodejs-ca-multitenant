let mongoose = require('../connection')

let Schema = mongoose.Schema
let FarmSchema = new Schema({
  farm_id: Number,
  name: String,
  latitude: Number,
  longitude: Number,
  culture: String,
  variety: String,
  total_area: Number,
  yield_estimation: Number,
  price: Number
})

let Farm = mongoose.model('Farm', FarmSchema)

module.exports = Farm