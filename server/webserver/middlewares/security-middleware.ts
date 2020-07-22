import {EndpointInfo, IMiddleware, Middleware, Req} from '@tsed/common';
import {Forbidden, Unauthorized} from '@tsed/exceptions';

const url = require('url');

@Middleware()
export class SecurityMiddleware implements IMiddleware {

  public use(@Req() request: Express.Request, @EndpointInfo() endpoint: EndpointInfo) {
    // retrieve options given to the @UseAuth decorator
    const options = endpoint.get(SecurityMiddleware) || {};

    console.log(request);
    // if (!request.isAuthenticated()) { // passport.js method to check auth
    //   throw new Unauthorized('Unauthorized');
    // }

    // if (request.user.role !== options.role) {
    //   throw new Forbidden('Forbidden');
    // }
  }

}