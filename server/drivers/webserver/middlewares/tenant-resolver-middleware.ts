import { Request, Response } from 'express';

var url = require('url');

const getConnectionBySlug = require('../../../db/sql/connectionManager').getConnectionBySlug
const getNamespace = require('continuation-local-storage').getNamespace

export class TenantResolverMiddleware {
  /**
  * Get the connection instance for the given tenant's slug and set it to the current context.
  **/
  resolver(req: Request, res: Response, next: any) {
    const pathsPermitidosSemTenant = ['/',
                                      '/farms/*',
                                      '/swagger',
                                      '/swagger/',
                                      '/farmndvis/*',
                                      '/farmprecipitations/*',
                                      '/swagger/favicon.ico',
                                      '/swagger/favicon-16x16.png',
                                      '/swagger/favicon-32x32.png',
                                      '/swagger/swagger-ui.css',
                                      '/swagger/swagger-ui-bundle.js',
                                      '/swagger/swagger-ui-standalone-preset.js',
                                      '/swagger/swagger-ui-init.js',
                                      '/swagger/swagger.json'];

    var path = url.parse(req.url).pathname;
    console.log("req.path", path );
    let tenantNecessario = true;

    for(let i = 0; i < pathsPermitidosSemTenant.length; i++) {
      // checking * routes
      if( pathsPermitidosSemTenant[i].indexOf('*') >= 0 ) {
        if(path.includes(pathsPermitidosSemTenant[i].replace('*','')) || path.includes(pathsPermitidosSemTenant[i].replace('/*',''))){
          console.log('tenant-resolver: * routes');
          tenantNecessario = false;
          break;
        }
      }
      else if ( pathsPermitidosSemTenant[i] === path ) {
        tenantNecessario = false;
        break;
      }
    }

    if (tenantNecessario && !req.headers.slug) {
      console.log("Nenhum tenant definido no header")
      res.json({ message: `Por favor defina um tenant ( Http Headers ) para processar esta requisição.` });
      return;
    }
    next();
  }
  
}