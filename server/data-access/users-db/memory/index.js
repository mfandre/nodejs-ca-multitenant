let USERS = require('../../../db/memory/users') // DB
let makeUser = require('../../../models/user/index') // model
let serialize = require('./serializer') // serializer custom to db

let listUsers = (tenant) => {
  return Promise.resolve(serialize(USERS))
}

let findUser = (tenant, prop, val) => {
  if (prop === 'id') { prop = 'user_id' }
  let user = USERS.find(user => user[prop] == val)
  return Promise.resolve(serialize(user))
}

let findUsersBy = (tenant, prop, val) => {
  let user = USERS.filter(user => user[prop] == val)
  return Promise.resolve(serialize(user))
}

let dropAll = (tenant) => {
  USERS = [];
  return USERS;
}

module.exports = {
  listUsers,
  findUser,
  findUsersBy,
  dropAll
}
