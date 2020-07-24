import {Configuration, Inject } from '@tsed/di';
import {PlatformApplication, GlobalErrorHandlerMiddleware} from '@tsed/common';
import '@tsed/platform-express'; // /!\ keep this import
import {GlobalAcceptMimesMiddleware} from '@tsed/platform-express';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import '@tsed/ajv';
import '@tsed/swagger';
import * as bodyParser from 'body-parser';

import { KnexManager } from './../db/sql/knex-manager';
import { TenantMiddleware } from './middlewares/tenant-middleware';

export const rootDir = __dirname;

const config = require('./../core/config');

const PORT = config.PORT || 3000;
const ENV = config.NODE_ENV;
console.log('environment', ENV);

/**
 * CORS config
 */
const whitelist = ['http://localhost:4200'];
console.log('cors-whitelist', whitelist);
const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if ( ENV === 'development' ||  whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  }
};


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

  $beforeRoutesInit() {
    this.app
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

  $afterRoutesInit() {
    this.app.use(GlobalErrorHandlerMiddleware);
    KnexManager.getConnectionManager();
    console.log('API pronta.');
  }
}
