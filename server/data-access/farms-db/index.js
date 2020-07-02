let {
  listFarms,
  findFarm,
  findFarmsBy,
  addFarm,
  deleteFarm,
  dropAll
} 
 = require('./memory/index') // switch out db as required
// = require('./mongod/index')
//= require('./pg/index')

let farmsDb = {
  listFarms,
  findFarm,
  findFarmsBy,
  addFarm,
  deleteFarm,
  dropAll
}

module.exports = farmsDb
