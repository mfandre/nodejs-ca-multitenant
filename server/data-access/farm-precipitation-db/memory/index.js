let FARMS_PRECIPITATION = require('../../../db/memory/farms-precipitation') // DB
let makeFarmPrecipitation = require('../../../models/farm-precipitation/index') // model
let serialize = require('./serializer') // serializer custom to db

let listFarmPrecipitations = () => {
  return Promise.resolve(serialize(FARMS_PRECIPITATION))
}

let findFarmPrecipitation = (prop, val) => {
  if (prop === 'id') { prop = 'farm_precipitation_id' }
  let farmPrecipitation = FARMS_PRECIPITATION.find(farmPrecipitation => farmPrecipitation[prop] == val)
  return Promise.resolve(serialize(farmPrecipitation))
}

let findFarmPrecipitationsBy = (prop, val) => {
  let farmPrecipitations = FARMS_PRECIPITATION.filter(farmPrecipitation => farmPrecipitation[prop] == val)
  return Promise.resolve(serialize(farmPrecipitations))
}

let addFarmPrecipitation = (farmPrecipitationInfo) => {
  let farmPrecipitation = makeFarmPrecipitation(farmPrecipitationInfo)
  let newFarmPrecipitation = {
    farm_precipitation_id: farmPrecipitation.getFarmPrecipitationId(),
    farm_id: farmPrecipitation.getFarmId(),
    date: farmPrecipitation.getDate(),
    precipitation: farmPrecipitation.getPrecipitation(),
  }
  FARMS_PRECIPITATION.push(newFarmPrecipitation)
  return findFarmPrecipitation('id', newFarmPrecipitation.farm_precipitation_id)
}

let deleteFarmPrecipitation = (id) => {
  return findFarmPrecipitation('id', id)
    .then(farmPrecipitation => {
      if (farmPrecipitation.farm_precipitation_id == id) {
        FARMS_PRECIPITATION = FARMS_PRECIPITATION.filter(farmPrecipitation => farmPrecipitation.farm_precipitation_id != id)
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
  FARMS_PRECIPITATION = [];
  return FARMS_PRECIPITATION;
}

module.exports = {
  listFarmPrecipitations,
  findFarmPrecipitation,
  findFarmPrecipitationsBy,
  addFarmPrecipitation,
  deleteFarmPrecipitation,
  dropAll
}
