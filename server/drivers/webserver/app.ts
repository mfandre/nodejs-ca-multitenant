import cors from 'cors';
import express from 'express'


import { TenantResolverMiddleware } from './middlewares/tenant-resolver-middleware';
import { PaginacaoMiddleware } from './middlewares/paginacao-middleware';
import { ErrorHandlerMiddleware } from './middlewares/error-handler-middleware';
import { Server } from 'typescript-rest';

var url = require('url');

export class App {
  public static version: string = '1.0.0.20200707';

  public express: express.Application;
  private tenantResolverMiddleware = new TenantResolverMiddleware();
  private paginacaoMiddleware = new PaginacaoMiddleware();
  private errorHandlerMiddleware = new ErrorHandlerMiddleware();

  constructor() {
    this.express = express();
    this.middlewares();
  }


  private middlewares(): void {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(this.tenantResolverMiddleware.resolver);
    this.routes();
    Server.buildServices(this.express);
    // Server.loadServices(this.express, 'controllers/autenticacao/v1/*', __dirname);
    // Server.loadServices(this.express, 'routes/autenticacao/v2/*', __dirname);

    // Server.loadServices(this.express, './routes');
    this.express.use(this.errorHandlerMiddleware.resolver);
    this.express.use(this.paginacaoMiddleware.paginar);
  } 

  private routes(): void {
    const loginRota = require('./routes/login/route');
    loginRota.register(this.express);

    const autenticacaoRota = require('./routes/autenticacao/v1/autenticacao-rota');
    autenticacaoRota.register(this.express);

    const swaggerUi = require('swagger-ui-express');
    const specs = require('./routes/swagger/swagger.js');

    this.express.get('/swagger.json', function(req, res, next) {
      res.setHeader('Content-Type', 'application/json');
      res.send(specs);
    });
    this.express.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

    // this.express.get('/', (req, res) => {
    //   return res.send('healthmap_api_v4 is running @ vr.: ' + App.version);
    // });    

    // 404
    this.express.use(function (req, res, next) {
      console.log('pagina nao encontrada.');
      res.status(404).json({
        status: 'Página inexistente.'
      });
    });
  }
}

export default new App().express