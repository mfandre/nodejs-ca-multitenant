import { MyKnex } from './../../db/sql/my-knex';
import { Request } from "express";

export class DefaultRepository<T> {

  private conn: any;
  private request: Request;

  public getConn() {
    try {
      const keyds = this.request.headers['keyds'];

      this.conn = MyKnex.getConnectionManager()
                        .getConnectionByKeyDS(keyds);
    }
    catch (e) {
      console.error(e);

      return null;
    }

    return this.conn;
  }

  public getRequest(): Request {
    return this.request;
  }

  public setRequest(request: Request) {
    this.request = request;

    return this;
  }

}