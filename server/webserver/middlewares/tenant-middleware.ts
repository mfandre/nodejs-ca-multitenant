import {IMiddleware, Middleware, Req, Res, Next } from '@tsed/common';

const url = require('url');


@Middleware()
export class TenantMiddleware implements IMiddleware {

  use(@Req() req: Req, @Res() res: Res, @Next() next: Next) {
    const pathsPermitidosSemTenant = ['/',
                                      '/api-docs',
                                      '/api-docs/',
                                      '/api-docs/favicon.ico',
                                      '/api-docs/favicon-16x16.png',
                                      '/api-docs/favicon-32x32.png',
                                      '/api-docs/swagger-ui.css',
                                      '/api-docs/swagger-ui-bundle.js',
                                      '/api-docs/swagger-ui-standalone-preset.js',
                                      '/api-docs/swagger-ui-init.js',
                                      '/api-docs/swagger.json'];

    const path = url.parse(req.url).pathname;
    console.log('req.path', path );
    let tenantNecessario = true;

    for (let i = 0; i < pathsPermitidosSemTenant.length; i++) {
      // checking * routes
      if ( pathsPermitidosSemTenant[i].indexOf('*') >= 0 ) {
        if (path.includes(pathsPermitidosSemTenant[i].replace('*', '')) || path.includes(pathsPermitidosSemTenant[i].replace('/*', ''))) {
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

    if ( tenantNecessario && !req.headers['keyds'] ) {
      console.error('Nenhum tenant (keyds) definido no header');
      res.status(400);
      res.json({message: 'Por favor defina um tenant ( Http Headers . keyds ) para processar esta requisição.'});

      return;
    }

    next();
  }
}
