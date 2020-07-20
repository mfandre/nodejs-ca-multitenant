import { MyKnex } from './../../db/sql/my-knex';
import { Request } from "express";

export class DefaultRepository<T> {

  private conn: any;
  private request: Request;

  public getConn() {
      if ( !this.request ) {
        throw (new Error('Verifique se o objeto Request foi definido na camada do controller, serviço ou repositório.'));
      }

      const keyds = this.request.headers['keyds'];

      if ( !keyds ) {
        throw (new Error('Verifique se a identificação do tenant ( keyds ) está presente na requisição.'));
      }

      this.conn = MyKnex.getConnectionManager()
                        .getConnectionByKeyDS(keyds);

      if ( !this.conn ) {
        throw (new Error('Conexão não estabelecida para o tenant ' + keyds));
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