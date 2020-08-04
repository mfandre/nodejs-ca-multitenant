import { Response, Request } from 'express';

import { HttpUtil } from './../utils/http-util';


export class PaginacaoMiddleware {

  paginar(req: Request, res: Response, next: any): void {
    let body: string;
    try {
      body = JSON.stringify(HttpUtil.paginarResponse(req.body, req));
    }
    catch (err) {
      res.send(err.toString());

      return;
    }
    res.send(body);
    next();
  }

}