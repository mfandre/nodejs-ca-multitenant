let knex = require('../../../sql/knex.js')
let makeUser = require('../../../models/user/index') // model

let listUsers = (tenant) => {
  return knex.getConnectionByKeyDS(tenant).raw(`SELECT * FROM user;`)
    .then(data => data.rows)
}

let findUser = (tenant, prop, val) => {

  let conn = knex.getConnectionByKeyDS(tenant);

  if(conn === undefined)
    return null;

  return conn.select('*').from('user').where(prop, '=', val);
}

let findUsersBy = (tenant, prop, val) => {
  let conn = knex.getConnectionByKeyDS(tenant);

  if(conn === undefined)
    return null;
  return conn.select('*').from('user').where(prop, '=', val);
}

let addUser = (tenant, userInfo) => {
  let conn = knex.getConnectionByKeyDS(tenant);

  if(conn === undefined)
    return null;

  let user = makeUser(userInfo)
  let newUser = {
    name: user.getName(),
    email: user.getEmail(),
    password: user.getPassword()
  }
  return conn('user')
    .insert(newUser)
    .returning('*')
}

let deleteUser = (tenant, id) => {
  let conn = knex.getConnectionByKeyDS(tenant);

  if(conn === undefined)
    return null;

  return conn('user')
    .where('id', id)
    .del()
}

let dropAll = (tenant) => {
  let conn = knex.getConnectionByKeyDS(tenant);

  if(conn === undefined)
    return null;

  return conn.raw(`
    DELETE FROM user;
    ALTER SEQUENCE user_id_seq RESTART WITH 1;
  `)
}

module.exports = {
  listUsers,
  findUser,
  findUsersBy,
  addUser,
  deleteUser,
  dropAll
}