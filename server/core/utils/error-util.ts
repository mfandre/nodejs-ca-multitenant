import { IResponseError } from '@tsed/common';
import { Response } from "express";
import { Exception } from '@tsed/exceptions';

export class ErrorUtil {

  public static sendHttpException(res: Response, error: Exception) {
    console.error(error);
    const err = this.mapError(error);

    res
      .set(ErrorUtil.getHeaders(error))
      .status(error.status)
      .json(err);

    res.send();
  }

  private static getHeaders(error: any) {
    return [error, error.origin]
      .filter(Boolean)
      .reduce((obj, {headers}: IResponseError) => {
        return {
          ...obj,
          ...headers || {}
        };
      }, {});
  }

  private static mapError(error: any) {
    return {
      message: error.message,
      stack: undefined,
      status: error.status || 500,
      origin: {
        ...error.origin || {},
        errors: undefined
      },
      errors: ErrorUtil.getErrors(error)
    };
  }

  private static getErrors(error: any) {
    return [error, error.origin]
      .filter(Boolean)
      .reduce((errs, {errors}: IResponseError) => {
        return [
          ...errs,
          ...errors || []
        ];
      }, []);
  }

}