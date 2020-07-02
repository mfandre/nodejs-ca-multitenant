let buildMakeFarmPrecipitation = function(farmPrecipitationValidator) {
  return ({
    farm_precipitation_id,
    farm_id,
    date,
    precipitation,
  } = {}) => {
    let {error} = farmPrecipitationValidator({farm_precipitation_id,farm_id,date,precipitation})
    if (error) throw new Error(error)

    return {
      getFarmPrecipitationId: () => farm_precipitation_id,
      getFarmId: () => farm_id,
      getDate: () => date,
      getPrecipitation: () => precipitation,
    }
  }
}

module.exports = buildMakeFarmPrecipitation