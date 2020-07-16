import { Request, Response } from "express";

export class ErrorHandlerMiddleware {

  resolver(err: any, req: Request, res: Response, next: any) {
    if (err) {
      console.error(err.message);

      if (!err.statusCode) {
        err.statusCode = 500;
      } // Set 500 server code error if statuscode not set

      return res.status(err.statusCode).send({
        statusCode: err.statusCode,
        message: err.message
      });
    }
    next();
  }

}