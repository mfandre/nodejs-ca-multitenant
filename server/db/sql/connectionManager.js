// import TypedKnex from "@wwwouter/typed-knex";
// const TypedKnex = require('typed-knex');
const knex = require('knex');
const config = require('../../config');

const environment = config.NODE_ENV || 'development';
const knexConfig = require('../../knexfile')[environment];
const commonDBConnection = knex(knexConfig);


console.log("tenant conn", knexConfig);

const connectionManager = module.exports = {};

connectionManager.connectionMap = {};
/**
 *  Create knex instance for all the tenants defined in common database and store in a map.
**/
connectionManager.connectAllDb = async () => {
  let tenants;

  try {
    tenants = await commonDBConnection.select('*').from('tenant');
  }
  catch (e) {
    console.log('error', e);

    return;
  }

  connectionManager.connectionMap = tenants
    .map(tenant => {
      // const typedKnex = new TypedKnex(knex(connectionManager.createConnectionConfig(tenant)));
      const typedKnex = knex(connectionManager.createConnectionConfig(tenant));

      return {
        [tenant.slug]: typedKnex
      };
    })
    .reduce((prev, next) => {
      return Object.assign({}, prev, next);
    }, {});
};

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

    // TODO
    pool: { min: 2, max: 20 }
  };
};

/**
 *  Get the connection information (knex instance) for the given tenant's slug.
**/
connectionManager.getConnectionByKeyDS = (slug) => {

  if (connectionManager.connectionMap) {

    console.log("slug=>", slug);

    return connectionManager.connectionMap[slug];
  }
};