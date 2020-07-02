const _serializeSingle = (user) => {
  return {
    'email': user.email,
    'name': user.name,
    'password': user.password,
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
