let {
  listFarmPrecipitations,
  findFarmPrecipitation,
  findFarmPrecipitationsBy,
  addFarmPrecipitation,
  deleteFarmPrecipitation,
  dropAll
} 
 = require('./memory/index') // switch out db as required
// = require('./mongod/index')

let farmPrecipitationssDb = {
  listFarmPrecipitations,
  findFarmPrecipitation,
  findFarmPrecipitationsBy,
  addFarmPrecipitation,
  deleteFarmPrecipitation,
  dropAll
}

module.exports = farmPrecipitationssDb
