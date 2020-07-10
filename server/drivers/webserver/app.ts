import express, { Request, Response } from 'express'
import cors from 'cors'

import { HttpUtil } from './../../app/core/utils/http-util';
import { TenantResolver } from './middlewares/tenant-resolver';

// import { AutenticacaoRota } from './../webserver/routes/autenticacao/v1/autenticacao-rota'

var url = require('url');
var interceptor = require('express-interceptor');

export class App {
  public static version: string = '1.0.0.20200707';

  public express: express.Application;
  private static tenantResolver = new TenantResolver();

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  myResponseInterceptor = interceptor(function(req: express.Request, res: express.Response, next: any) {
    return {
      isInterceptable: function(){

        const pathsPermitidosSemTenant = ['/',
                                          '/farms/*',
                                          '/farmndvis/*',
                                          '/farmprecipitations/*',
                                          '/favicon.ico',
                                          '/favicon-16x16.png',
                                          '/favicon-32x32.png',
                                          '/swagger-ui.css',
                                          '/swagger-ui-bundle.js',
                                          '/swagger-ui-standalone-preset.js',
                                          '/swagger-ui-init.js',
                                          '/swagger.json'];

        var path = url.parse(req.url).pathname
        console.log("req.path", req.url )
        for(let i = 0; i < pathsPermitidosSemTenant.length;i++){
          // checking * routes
          if(pathsPermitidosSemTenant[i].indexOf('*') >= 0){
            if(path.includes(pathsPermitidosSemTenant[i].replace('*','')) || path.includes(pathsPermitidosSemTenant[i].replace('/*',''))){
              // return false;
              return next();
            }
          }
          else if (pathsPermitidosSemTenant[i] === path) {
            // return false;
            return next();
          }
        }

        return true;
        // return /text\/html/.test(res.get('Content-Type'));
      },

      intercept: function(body: any, send: any) {
        App.tenantResolver.resolver(req, res, next);

        try {
          body = JSON.stringify(HttpUtil.paginarResponse(body, req));
        }
        catch (err) {
          res.send(err.toString());
        }
        send(body);
      }
    };    
  });

  private middlewares(): void {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(this.myResponseInterceptor);
    
    // === BOILERPLATE ===
    // Catch and send error messages
    this.express.use((err: any, req: Request, res: Response, next: any) => {
      if (err) {
        console.error(err.message);

        if (!err.statusCode) {
          err.statusCode = 500
        } // Set 500 server code error if statuscode not set
        
        return res.status(err.statusCode).send({
          statusCode: err.statusCode,
          message: err.message
        })
      }
      next()
    });

    // // 404
    // this.express.use(function (req, res) {
    //   res.status(404).json({
    //     status: 'Página inexistente.'
    //   });
    // });

  } 

  private routes(): void {
    // const autenticacaoRota = require('./routes/autenticacao/v1/autenticacao-rota');
    // this.express.use('/api', autenticacaoRota);

    const loginRota = require('./routes/login/route');
    loginRota.register(this.express);
    // this.express.use('/api', loginRota.register());

    // // const autenticacaoRota = new AutenticacaoRota();
    // // this.express.use('/api', autenticacaoRota.inicializarRota());
    // this.express.use('/api', teste);

    const swaggerUi = require('swagger-ui-express');
    const specs = require('./routes/swagger/swagger.js');

    this.express.get('/swagger.json', function(req, res, next) {
      res.setHeader('Content-Type', 'application/json');
      res.send(specs);
    });
    this.express.use('/', swaggerUi.serve, swaggerUi.setup(specs));

    // this.express.get('/', (req, res) => {
    //   return res.send('healthmap_api_v4 is running @ vr.: ' + App.version);
    // });    
  }
}

export default new App().express