import { Request } from "express";


export class DefaultService<T> {

  private request: Request;

  public getRequest(): Request {
    return this.request;
  }

  public setRequest(request: Request): any {
    this.request = request;

    return this;
  }

}
