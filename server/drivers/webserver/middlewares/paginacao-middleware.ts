import { Response, Request } from 'express';

import { HttpUtil } from './../../../core/utils/http-util';


export class PaginacaoMiddleware {

  paginar(req: Request, res: Response, next: any) {
    let body: string;
    try {
      body = JSON.stringify(HttpUtil.paginarResponse(req.body, req));
    }
    catch (err) {
      res.send(err.toString());

      return false;
    }
    res.send(body);
    next();
  }

}