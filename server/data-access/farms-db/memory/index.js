let FARMS = require('../../../db/memory/farms') // DB
let makeFarm = require('../../../models/farm/index') // model
let serialize = require('./serializer') // serializer custom to db

let listFarms = () => {
  return Promise.resolve(serialize(FARMS))
}

let findFarm = (prop, val) => {
  if (prop === 'id') { prop = 'farm_id' }
  let farm = FARMS.find(farm => farm[prop] == val)
  return Promise.resolve(serialize(farm))
}

let findFarmsBy = (prop, val) => {
  return Promise.resolve(serialize(farm))
}

let addFarm = (farmInfo) => {
  let farm = makeFarm(farmInfo)
  let newFarm = {
    farm_id: FARMS.length + 1,
    name: farm.getName(),
    longitude: farm.getLongitude(),
    latitude: farm.getLatitude(),
    price: farm.getPrice(),
    total_area: farm.getTotalArea(),
    variety: farm.getVariety(),
    yield_estimation: farm.getYieldEstimation(),
    culture: farm.getCulture()
  }
  FARMS.push(newFarm)
  return findFarm('id', newFarm.farm_id)
}

let deleteFarm = (id) => {
  return findFarm('id', id)
    .then(farm => {
      if (farm.farm_id == id) {
        FARMS = FARMS.filter(farm => farm.farm_id != id)
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
  FARMS = [];
  return FARMS;
}

module.exports = {
  listFarms,
  findFarm,
  findFarmsBy,
  addFarm,
  deleteFarm,
  dropAll
}
