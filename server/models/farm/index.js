let buildMakeFarm = require('./farm')
let farmSchema = require('./farm-schema')
let farmValidator = require('../validator/')(farmSchema)

let makeFarm = buildMakeFarm(farmValidator)

module.exports = makeFarm

