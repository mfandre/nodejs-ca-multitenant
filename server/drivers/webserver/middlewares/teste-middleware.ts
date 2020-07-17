import { Locals, Middleware, Req, Res, Next } from "@tsed/common";

const createNamespace = require('continuation-local-storage').createNamespace;

@Middleware()
export class TesteMiddleware {

  use(@Req() req: Req, @Res() res: Res, @Next() next: Next) {

    // const session = createNamespace('sessao');

    // console.log('keyds: ' + req.headers['keyds']);
    // session.set('keyds', req.headers['keyds']);

    // set some on locals
    // locals.user = Math.random();

    next();
  }

}