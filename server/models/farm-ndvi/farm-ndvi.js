let buildMakeFarmNdvi = function(farmNdviValidator) {
  return ({
    farm_ndvi_id,
    farm_id,
    date,
    ndvi,
  } = {}) => {
    let {error} = farmNdviValidator({farm_ndvi_id,farm_id,date,ndvi})
    if (error) throw new Error(error)

    return {
      getFarmNdviId: () => farm_ndvi_id,
      getFarmId: () => farm_id,
      getDate: () => date,
      getNdvi: () => ndvi,
    }
  }
}

module.exports = buildMakeFarmNdvi