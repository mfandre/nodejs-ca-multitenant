const knex = require('knex');

const config = require('../../config');

const environment = config.NODE_ENV || 'development';
const knexConfig = require('../../knexfile')[environment];
const commonDBConnection = knex(knexConfig);

export class MyConnectionManager {


  private connectionMap = new Map<string, any>();

  constructor() {
    console.log('construindo novo connection-manager...');

    this.connectionMap = new Map<string, any>();

    this.connectAllDb().then(() => {
      console.log('connectionMap: ' + this.connectionMap);
    }).catch(error => {
        console.log("Não foi possível se conectar ao common tenant database");
        console.log(error);
    });
  }


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
          const typedKnex = knex(this.createConnectionConfig(tenant));

          return {
            [tenant.keyds]: typedKnex
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

  public getConnectionByKeyDS = (keyds): any => {

    if ( this.connectionMap ) {
      console.log("keyds=>", keyds);

      return this.connectionMap[keyds];
    }
  };

}
