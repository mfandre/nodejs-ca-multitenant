let FarmPrecipitation = require('../../../db/mongodb/models/farm-precipitation')
let makeFarmPrecipitation = require('../../../models/farm-precipitation/index') // model
let serialize = require('./serializer') // serializer custom to db

let listFarmPrecipitations = () => {
  return FarmPrecipitation.find({})
    .then(serialize)
}

let findFarmPrecipitation = (prop, val) => {
  if (prop === 'id') {
    prop = '_id'
  }
  return FarmPrecipitation.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
    })
}

let findFarmPrecipitationsBy = (prop, val) => {
  return FarmPrecipitation.find({[prop]: val})
  .then(resp => {
    return serialize(resp)
  })
}

let addFarmPrecipitation = (farmPrecipitationInfo) => {
  let farmPrecipitation = makeFarmPrecipitation(farmPrecipitationInfo)
  let newFarmPrecipitation = {
    farm_precipitation_id: farmPrecipitation.getFarmPrecipitationId(),
    farm_id: farmPrecipitation.getFarmId(),
    date: farmPrecipitation.getDate(),
    precipitation: farmPrecipitation.getPrecipitation(),
  }
  return FarmPrecipitation.create(newFarmPrecipitation)
    .then(serialize)
}

let deleteFarmPrecipitation = (id) => {
  return FarmPrecipitation.find({["farm_precipitation_id"]: id}).then(resp => {
    if(resp.length != 1){
      throw new Error("fail to delete farm precipitation");
    }

    FarmPrecipitation.findByIdAndDelete(resp[0].id)
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
  return FarmPrecipitation.remove()
}

module.exports = {
  listFarmPrecipitations,
  findFarmPrecipitation,
  findFarmPrecipitationsBy,
  addFarmPrecipitation,
  deleteFarmPrecipitation,
  dropAll
}

