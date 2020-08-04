import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication, GlobalErrorHandlerMiddleware } from '@tsed/common';
import '@tsed/platform-express'; // /!\ keep this import
import {GlobalAcceptMimesMiddleware} from '@tsed/platform-express';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import '@tsed/ajv';
import '@tsed/swagger';
import * as bodyParser from 'body-parser';

import { TenantMiddleware } from './../core/middlewares/tenant-middleware';
import { ConnectionManager } from './../core/db/sql/connection-manager';
import { winstonSetup } from './../core/config/winston.config';
import { corsSetup } from './../core/config/cors.config';
import { MongoConnectionManager } from './../core/db/mongodb/mongo-connection-manager';

export const rootDir = __dirname;

const config = require('./../core/config');
const helmet = require('helmet');

const PORT = config.PORT || 3000;

/**
 * LOGS config
 */
const logger = winstonSetup();

const ENV = config.NODE_ENV;
logger.info('environment => ' + ENV);


/**
 * CORS config
 */
const corsOptions = corsSetup();


@Configuration({
  rootDir,
  acceptMimes: ['application/json'],
  httpPort: config.PORT || 3000,
  httpsPort: false, // CHANGE,
  logger: {
    debug: true,
    logRequest: false,
    requestFields: ['reqId', 'method', 'url', 'headers', 'query', 'params', 'duration']
  },
  mount: {
    '/rest': [
      `${rootDir}/controllers/**/*.ts`
    ]
  },
  swagger: [
    {
      path: '/api-docs'
    }
  ],
  exclude: [
    '**/*.spec.ts'
  ],
  componentsScan: [
    '${rootDir}/services/**/*.ts',
    '${rootDir}/repositories/**/*.ts',
    '${rootDir}/middlewares/**/*.ts'
  ]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(helmet())
      .use((req, res, done) => {
          logger.info(req.originalUrl);
          done();
      })
      .use(cors(corsOptions))
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }))
      .use(GlobalAcceptMimesMiddleware)
      .use(TenantMiddleware);
  }

  $afterRoutesInit(): void {
    this.app.use(GlobalErrorHandlerMiddleware);

    ConnectionManager.getInstance();
    MongoConnectionManager.getInstance();

    logger.info('API disponível.');
  }
}
