let knex = require('knex')
let config = require('../../config')

var environment = config.NODE_ENV || 'development';
var knexConfig = require('../../knexfile')[environment];
commonDBConnection = knex(knexConfig)

//console.log("environment", environment)
console.log("tenant conn", knexConfig)

let connectionManager = module.exports = {}

connectionManager.connectionMap = {}
/**
 *  Create knex instance for all the tenants defined in common database and store in a map.
**/
connectionManager.connectAllDb = async () => {
  let tenants;

  try {
    tenants = await commonDBConnection.select('*').from('tenant');
  } catch (e) {
    console.log('error', e);
    return;
  }

  connectionManager.connectionMap = tenants
      .map(tenant => {
        return {
          [tenant.slug]: knex(connectionManager.createConnectionConfig(tenant))
        }
      })
      .reduce((prev, next) => {
        return Object.assign({}, prev, next);
      }, {});
}

/**
 *  Create configuration object for the given tenant.
**/
connectionManager.createConnectionConfig = (tenant) => {
  return {
    client: tenant.db_client,
    connection: {
      host: tenant.db_host,
      port: tenant.db_port,
      user: tenant.db_username,
      database: tenant.db_name,
      password: tenant.db_password
    },
    pool: { min: 2, max: 20 }
  };
}

/**
 *  Get the connection information (knex instance) for the given tenant's slug.
**/
connectionManager.getConnectionBySlug = (slug) => {
  
  if (connectionManager.connectionMap) {

    //console.log("connectionManager.connectionMap", connectionManager.connectionMap[slug])
    console.log("slug=>", slug)

    return connectionManager.connectionMap[slug];
  }
}