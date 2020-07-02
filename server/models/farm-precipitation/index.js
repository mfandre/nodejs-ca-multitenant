let buildMakeFarmPrecipitation = require('./farm-precipitation')
let farmPrecipitationSchema = require('./farm-precipitation-schema')
let farmPrecipitationValidator = require('../validator/')(farmPrecipitationSchema)

let makeFarmPrecipitation = buildMakeFarmPrecipitation(farmPrecipitationValidator)

module.exports = makeFarmPrecipitation

