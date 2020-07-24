import {IMiddleware, Middleware, Req, Res, Next } from '@tsed/common';



export class ReflectionRouterMiddleware {

  use(@Req() req: Req, @Res() res: Res, @Next() next: Next) {
  }

}