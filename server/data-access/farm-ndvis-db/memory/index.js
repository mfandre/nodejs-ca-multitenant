let FARMS_NDVI = require('../../../db/memory/farms-ndvi') // DB
let makeFarmNdvi = require('../../../models/farm-ndvi/index') // model
let serialize = require('./serializer') // serializer custom to db

let listFarmNdvis = () => {
  return Promise.resolve(serialize(FARMS_NDVI))
}

let findFarmNdvi = (prop, val) => {
  if (prop === 'id') { prop = 'farm_ndvi_id' }
  let farmNdvi = FARMS_NDVI.find(farmNdvi => farmNdvi[prop] == val)
  return Promise.resolve(serialize(farmNdvi))
}

let findFarmNdvisBy = (prop, val) => {
  let farmNdvis = FARMS_NDVI.filter(farmNdvi => farmNdvi[prop] == val)
  return Promise.resolve(serialize(farmNdvis))
}

let addFarmNdvi = (farmNdviInfo) => {
  let farmNdvi = makeFarmNdvi(farmNdviInfo)
  let newFarmNdvi = {
    farm_ndvi_id: farmNdvi.getFarmNdviId(),
    farm_id: farmNdvi.getFarmId(),
    date: farmNdvi.getDate(),
    ndvi: farmNdvi.getNdvi(),
  }
  FARMS_NDVI.push(newFarmNdvi)
  return findFarmNdvi('id', newFarmNdvi.farm_ndvi_id)
}

let deleteFarmNdvi = (id) => {
  return findFarmNdvi('id', id)
    .then(farmNdvi => {
      if (farmNdvi.farm_ndvi_id == id) {
        FARMS_NDVI = FARMS_NDVI.filter(farmNdvi => farmNdvi.farm_ndvi_id != id)
        return {
          id,
          status: 'success'
        }
      }
      return {
        status: 'fail'
      }
    })
}

let dropAll = () => {
  FARMS_NDVI = [];
  return FARMS_NDVI;
}

module.exports = {
  listFarmNdvis,
  findFarmNdvi,
  findFarmNdvisBy,
  addFarmNdvi,
  deleteFarmNdvi,
  dropAll
}
