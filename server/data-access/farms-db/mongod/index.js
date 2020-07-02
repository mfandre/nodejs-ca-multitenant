let Farm = require('../../../db/mongodb/models/farm')
let makeFarm = require('../../../models/farm/index') // model
let serialize = require('./serializer') // serializer custom to db

let listFarms = () => {
  return Farm.find({})
    .then(serialize)
}

let findFarm = (prop, val) => {
  if (prop === 'id') {
    prop = '_id'
  }
  return Farm.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
    })
}

let findFarmsBy = (prop, val) => {
  return Farm.find({[prop]: val})
  .then(resp => {
    return serialize(resp)
  })
}

let addFarm = (farmInfo) => {
  let farm = makeFarm(farmInfo)
  let newFarm = {
    farm_id: farm.getFarmId(),
    name: farm.getName(),
    latitude: farm.getLatitude(),
    longitude: farm.getLongitude(),
    culture: farm.getCulture(),
    variety: farm.getVariety(),
    total_area: farm.getTotalArea(),
    yield_estimation: farm.getYieldEstimation(),
    price: farm.getPrice()
  }
  return Farm.create(newFarm)
    .then(serialize)
}

let deleteFarm = (id) => {
  return Farm.find({["farm_id"]: id}).then(resp => {
    if(resp.length != 1){
      throw new Error("fail to delete farm");
    }

    Farm.findByIdAndDelete(resp[0].id)
    .then(resp => {
      return {
        id: resp._id.toString(),
        status: 'success'
      }
    })
    .catch(err => {
      return {
        status: 'fail'
      }
    })
  })

  
}

let dropAll = () => {
  return Farm.remove()
}

module.exports = {
  listFarms,
  findFarm,
  findFarmsBy,
  addFarm,
  deleteFarm,
  dropAll
}

