const knex = require('knex');
const config = require('../../config');

const environment = config.NODE_ENV || 'development';
const knexConfig = require('../../knexfile')[environment];
const commonDBConnection = knex(knexConfig);

export class ConnectionManager {

  private connectionMap = {};
  private commonDBConnection = knex(knexConfig);

  connectAllDb = async () => {
    let tenants;

    try {
      tenants = await commonDBConnection.select('*').from('tenant');
    }
    catch (e) {
      console.log('error', e);

      return;
    }

    this.connectionMap = tenants
        .map(tenant => {
          // const typedKnex = new TypedKnex(knex(connectionManager.createConnectionConfig(tenant)));
          const typedKnex = knex(this.createConnectionConfig(tenant));

          return {
            [tenant.slug]: typedKnex
          };
        })
        .reduce((prev, next) => {
          return Object.assign({}, prev, next);
        }, {});

  }

  public createConnectionConfig = (tenant) => {
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

  public getConnectionBySlug = (slug) => {

    if ( this.connectionMap ) {
      console.log("slug=>", slug);

      return this.connectionMap[slug];
    }
  };

}
