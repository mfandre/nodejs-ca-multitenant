let {
  listFarmNdvis,
  findFarmNdvi,
  findFarmNdvisBy,
  addFarmNdvi,
  deleteFarmNdvi,
  dropAll
} 
 = require('./memory/index') // switch out db as required
// = require('./mongod/index')

let farmNdvisDb = {
  listFarmNdvis,
  findFarmNdvi,
  findFarmNdvisBy,
  addFarmNdvi,
  deleteFarmNdvi,
  dropAll
}

module.exports = farmNdvisDb
