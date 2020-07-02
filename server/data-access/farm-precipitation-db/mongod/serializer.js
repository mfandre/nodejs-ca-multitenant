const _serializeSingle = (farmPrecipitation) => {
  return {
    'farm_precipitation_id': farmPrecipitation.farm_precipitation_id,
    'farm_id': farmPrecipitation.farm_id,
    'date': farmPrecipitation.date,
    'precipitation': farmPrecipitation.precipitation
  };
};

const serializer = (data) => {
  if (!data) {
    return null
  }
  if (Array.isArray(data)) {
    return data.map(_serializeSingle)
  }
  return _serializeSingle(data)
}

module.exports = serializer
