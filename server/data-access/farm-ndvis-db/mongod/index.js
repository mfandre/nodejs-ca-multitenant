let FarmNdvi = require('../../../db/mongodb/models/farm-ndvi')
let makeFarmNdvi = require('../../../models/farm-ndvi/index') // model
let serialize = require('./serializer') // serializer custom to db

let listFarmNdvis = () => {
  return FarmNdvi.find({})
    .then(serialize)
}

let findFarmNdvi = (prop, val) => {
  if (prop === 'id') {
    prop = '_id'
  }
  return FarmNdvi.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
    })
}

let findFarmNdvisBy = (prop, val) => {
  return FarmNdvi.find({[prop]: val})
  .then(resp => {
    return serialize(resp)
  })
}

let addFarmNdvi = (farmNdviInfo) => {
  let farmNdvi = makeFarmNdvi(farmNdviInfo)
  let newFarmNdvi = {
    farm_ndvi_id: farmNdvi.getFarmNdviId(),
    farm_id: farmNdvi.getFarmId(),
    date: farmNdvi.getDate(),
    ndvi: farmNdvi.getNdvi(),
  }
  return FarmNdvi.create(newFarmNdvi)
    .then(serialize)
}

let deleteFarmNdvi = (id) => {
  return FarmNdvi.find({["farm_ndvi_id"]: id}).then(resp => {
    if(resp.length != 1){
      throw new Error("fail to delete farm ndvi");
    }

    FarmNdvi.findByIdAndDelete(resp[0].id)
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
  return FarmNdvi.remove()
}

module.exports = {
  listFarmNdvis,
  findFarmNdvi,
  findFarmNdvisBy,
  addFarmNdvi,
  deleteFarmNdvi,
  dropAll
}

