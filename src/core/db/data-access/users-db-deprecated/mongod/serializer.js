const _serializeSingle = (user) => {
  return {
    'email': user.email,
    'password': user.password,
    'name': user.name,
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
