let config = require('./config/index')
// In terminal open psql and create a new database. Then include the name of the database and your username and password in the development details below
// Run the following terminal command
// $ psql
// # CREATE DATABASE nameofyourdatabase;
// Note: remember the semicolon syntax
// # \q
module.exports = {
  development: {
    client: 'mssql',
    // connection: {
    //   host: 'localhost',
    //   user: 'postgres',
    //   password: 'postgres',
    //   database: 'common_tenant',
    //   port: 5432
    // },
    connection: {
      host: 'prd-dbserver01.healthmap.local',
      user: 'p_healthweb',
      password: 'prof9ezlPhapEhI4',
      database: 'p_healthweb',
      port: 1433
    },
    migrations: {
      directory: __dirname + '/db/sql/migrations'
    },
    seeds: {
      directory: __dirname + '/db/sql/seeds/development'
    }
  },
  production: {
    client: config.tenant_config.CLIENT,
    connection: {
      host: config.tenant_config.HOST,
      user: config.tenant_config.USER,
      password: config.tenant_config.PASSWORD,
      database: config.tenant_config.DATABASE,
      port: config.tenant_config.PORT,
      ssl: false
    },
    migrations: {
      directory: __dirname + '/db/sql/migrations'
    },
    seeds: {
      directory: __dirname + '/db/sql/seeds/production'
    }
  }
};