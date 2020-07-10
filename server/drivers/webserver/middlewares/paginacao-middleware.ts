import { Response, Request } from 'express';
import { HttpUtil } from "../../../app/core/utils/http-util";

// var interceptor = require('express-interceptor');

export class PaginacaoMiddleware {

  // interceptor(function(req: express.Request, res: express.Response, next: any) {

  paginar(req: Request, res: Response, next: any) {
    let body;
    try {
      body = JSON.stringify(HttpUtil.paginarResponse(body, req));
    }
    catch (err) {
      res.send(err.toString());
      return false;
    }
    res.send(body);
    next();
  }

}