const config = require('./../../../core/config');
const logger = require('winston');
const mongoose = require('mongoose');

export class MongoConnectionManager {

  // Set environment variables
  private env = config.NODE_ENV;
  private server = config.mongo.MONGO_SERVER;

    private static instance: MongoConnectionManager = null;

    public static getInstance(): MongoConnectionManager {
      if ( this.instance ) {
        return this.instance;
      }

      return this.instance = new MongoConnectionManager();
    }

    constructor() {
      logger.info('mongo_server: ' + this.server);

      if ( this.env === 'production' ) {
        mongoose.connect(`mongodb://${this.server}:27017/healthmapv4`, {useNewUrlParser: true, useUnifiedTopology: true, autoReconnect :  true})
        .catch(err => {
          logger.error(err);
        });
      }
      else {
        mongoose.connect(`mongodb://127.0.0.1:27017/healthmapv4`, {useNewUrlParser: true, useUnifiedTopology: true, autoReconnect :  true})
        .catch(err => {
          logger.error(err);
        });
      }

      // singal connection
      mongoose.connection
      .on('open', () => {
        logger.info('Conexão com MongoDB estabelecida com sucesso');
      })
      .on('error', () => {
        logger.error('Ocorreu um erro na conexão com o MongoDB');
      })
      .on('disconnected', () => {
        logger.error('Conexão com MongoDB perdida');
      });


      process.on('SIGINT', () => {
        mongoose.connection.close(() => {
          logger.info('A conexão padrão com Mongoose foi desconectada pelo término da aplicação');
          process.exit(0);
        });
      }).on('SIGTERM', () => {
        mongoose.connection.close(() => {
          logger.info('A conexão padrão com Mongoose foi desconetada pelo término da aplicação');
          process.exit(0);
        });
      });
    }
}