const _serializeSingle = (farm) => {
  return {
    'farm_id': farm.farm_id,
    'name': farm.name,
    'latitude': farm.latitude,
    'longitude': farm.longitude,
    'culture': farm.culture,
    'variety': farm.variety,
    'total_area': farm.total_area,
    'yield_estimation': farm.yield_estimation,
    'price': farm.price
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
