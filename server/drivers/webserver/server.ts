import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication, GlobalErrorHandlerMiddleware} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import {GlobalAcceptMimesMiddleware} from "@tsed/platform-express";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import { TenantMiddleware } from "./middlewares/tenant-middleware";
export const rootDir = __dirname;

const config = require('../../config');

const PORT = config.PORT || 3000;
const ENV = config.NODE_ENV;

console.log("EVN", ENV);

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: config.PORT || 3000,
  httpsPort: false, // CHANGE,
  logger: {
    debug: true,
    logRequest: false,
    requestFields: ["reqId", "method", "url", "headers", "query", "params", "duration"]
  },
  mount: {
    "/rest": [
      `${rootDir}/controllers/**/*.ts`
    ]
  },
  swagger: [
    {
      path: "/api-docs"
    }
  ],
  exclude: [
    "**/*.spec.ts"
  ],
  componentsScan: [
    "${rootDir}/services/**/*.ts",
    "${rootDir}/repositories/**/*.ts",
    "${rootDir}/middlewares/**/*.ts"
  ]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit() {
    this.app
      .use(cors())
      .use(GlobalAcceptMimesMiddleware)
      .use(TenantMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    const knex = require('./../../db/sql/knex');

    return null;
  }

  $afterRoutesInit() {
    this.app.use(GlobalErrorHandlerMiddleware);
  }
}