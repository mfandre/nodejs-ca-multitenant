let buildMakeFarm = function(farmValidator) {
  return ({
    farm_id,
    name,
    latitude,
    longitude,
    culture,
    variety,
    total_area,
    yield_estimation,
    price
  } = {}) => {
    let {error} = farmValidator({farm_id,name,latitude,longitude,culture,variety,total_area,yield_estimation,price})
    if (error) throw new Error(error)

    return {
      getName: () => name,
      getFarmId: () => farm_id,
      getLatitude: () => latitude,
      getLongitude: () => longitude,
      getCulture: () => culture,
      getVariety: () => variety,
      getTotalArea: () => total_area,
      getYieldEstimation: () => yield_estimation,
      getPrice: () => price,
    }
  }
}

module.exports = buildMakeFarm