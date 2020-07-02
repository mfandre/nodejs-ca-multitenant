let User = require('../../../db/mongodb/models/user')
let makeUser = require('../../../models/user/index') // model
let serialize = require('./serializer') // serializer custom to db

let listUsers = (tenant) => {
  return User.find({})
    .then(serialize)
}

let findUser = (tenant, prop, val) => {
  if (prop === 'id') {
    prop = '_id'
  }
  return User.find({[prop]: val})
    .then(resp => {
      return serialize(resp[0])
    })
}

let findUsersBy = (tenant, prop, val) => {
  return User.find({[prop]: val})
    .then(resp => {
      return serialize(resp)
    });
}

let dropAll = (tenant) => {
  return User.remove()
}

module.exports = {
  listUsers,
  findUser,
  findUsersBy,
  dropAll
}

