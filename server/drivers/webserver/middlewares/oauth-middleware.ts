import {Err, IMiddleware, IResponseError, Middleware, Req, Res, Next} from "@tsed/common";

const url = require('url');

@Middleware()
export class OAuthMiddleware implements IMiddleware {

  use(@Req() request: Req, @Res() response: Res, @Next() next: Next) {
    const path = url.parse(request.url).pathname;
    if ( path === '/rest/autenticacao/oauth/token'
         && request.body['grant_type'] === 'refresh_token'
         && request.cookies ) {

          console.log('RECUPERAR REQUEST COOKIES');
    }
    next();
  }

}