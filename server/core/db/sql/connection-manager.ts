import * as Knex from 'knex';

const config = require('./../../config');

const environment = config.NODE_ENV || 'development';
const knexConfig = require('./../../../knexfile')[environment];
const commonDBConnection = Knex(knexConfig);

export class ConnectionManager {

  private static instance: ConnectionManager = null;

  public static getInstance(): ConnectionManager {
    if ( this.instance ) {
      return this.instance;
    }

    return this.instance = new ConnectionManager();
  }



  private connectionMap = new Map<string, Knex>();

  constructor() {
    console.log('construindo connection-manager...');

    this.connectionMap = new Map<string, Knex>();

    this.connectAllDb().then(() => {
      let dbs = '';
      for (const i in this.connectionMap) {
        if ( dbs ) { dbs += ', '; }
        dbs += i;
      }
      console.log('connection-map => ' + dbs);
    })
    .catch(error => {
      console.log('Não foi possível se conectar ao common tenant database');
      console.log(error);
    });
  }


  private async connectAllDb(): Promise<any> {
    let tenants;

    try {
      tenants = await commonDBConnection.select('*').from('tenant');
    }
    catch (e) {
      console.error('error', e);

      return;
    }

    this.connectionMap = tenants
        .map(tenant => {
          const typedKnex: Knex = Knex(this.createConnectionConfig(tenant));
          console.log(typeof typedKnex);

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

  public getConnectionByKeyDS(keyds): Knex {

    if ( this.connectionMap ) {
      console.log('keyds=>', keyds);

      return this.connectionMap[keyds];
    }
  }

}
