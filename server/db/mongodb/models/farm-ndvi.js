let mongoose = require('../connection')

let Schema = mongoose.Schema
let FarmNdviSchema = new Schema({
  farm_ndvi_id: Number,
  farm_id: Number,
  date: Date,
  ndvi: Number,
})

let FarmNdvi = mongoose.model('FarmNdvi', FarmNdviSchema)

module.exports = FarmNdvi