let buildMakeUser = function(userValidator) {
  return ({
    email,
    name,
    password,
  } = {}) => {
    let {error} = userValidator({email,name,password})
    if (error) throw new Error(error)

    return {
      getName: () => name,
      getEmail: () => email,
      getPassword: () => password,
    }
  }
}

module.exports = buildMakeUser