const _serializeSingle = (farmNdvi) => {
  return {
    'farm_ndvi_id': farmNdvi.farm_ndvi_id,
    'farm_id': farmNdvi.farm_id,
    'date': farmNdvi.date,
    'ndvi': farmNdvi.ndvi
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
