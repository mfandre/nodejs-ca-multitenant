let buildMakeFarmNdvi = require('./farm-ndvi')
let farmNdviSchema = require('./farm-ndvi-schema')
let farmNdviValidator = require('../validator/')(farmNdviSchema)

let makeFarmNdvi = buildMakeFarmNdvi(farmNdviValidator)

module.exports = makeFarmNdvi

