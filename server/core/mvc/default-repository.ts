import { Request } from 'express';
import 'reflect-metadata';

import { Knex } from '../../db/sql/knex';
import { BaseModel } from './base-model';
import { Reflection } from './../config/reflection-constants';

const config = require('./../../core/config');


export class DefaultRepository<T> {

  private conn: any;
  private request: Request;
  private url: string;


  public setUrl(url: string): DefaultRepository<T> {
    this.url = url;

    return this;
  }

  public getConn(): any {
      if ( !this.request ) {
        const msg = 'Verifique se o objeto Request foi definido na camada do controller, serviço ou repositório.';
        console.error(msg);
        throw (new Error(msg));
      }

      const keyds = this.request.headers['keyds'];

      if ( !keyds ) {
        const msg = 'Verifique se a identificação do tenant ( keyds ) está presente na requisição.';
        console.error(msg);
        throw (new Error(msg));
      }

      this.conn = Knex.getConnectionManager()
                      .getConnectionByKeyDS(keyds);

      // nova tentativa de conexão
      if ( !this.conn ) {
        // Knex.getConnectionManager()
        //       .connectAllDb();

        // this.conn = Knex.getConnectionManager()
        //                 .getConnectionByKeyDS(keyds);

        if ( !this.conn ) {
          console.error('Conexão não estabelecida para o tenant ' + keyds);
          throw (new Error('Conexão não estabelecida para o tenant ' + keyds));
        }
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





  /** *****************************
   * ******************************
   * MÉTODOS GERADOS COM REFLECTION
   * @param clazz Nome da classe
   * ******************************
   ******************************** */
  private _tableNotFoundMsg = 'Verifique se utilizou o decorator @Table() no model.';

  public _listar<T extends BaseModel>(clazz): Promise<T> {
    const table = Reflect.getMetadata(Reflection.tableMetaKey, clazz);
    if ( !table ) {
      console.error(this._tableNotFoundMsg);

      return null;
    }

    // TODO: PAGINAR QUERY
    return this.getConn().select('*')
                         .from(table)
                         .limit(config.database_options.LIMIT);
 }

  public _buscarId = (clazz, id: number): Promise<T> => {
    const table = Reflect.getMetadata(Reflection.tableMetaKey, clazz);
    if ( !table ) {
      console.error(this._tableNotFoundMsg);

      return null;
    }

    return this.getConn().select('*')
                         .from(table)
                         .where('id', '=', id);
  }

  public _buscarPor = (clazz, prop, val): Promise<T[]> => {
    const table = Reflect.getMetadata(Reflection.tableMetaKey, clazz);
    if ( !table ) {
      console.error(this._tableNotFoundMsg);

      return null;
    }

    return this.getConn().select('*')
                         .from(table)
                         .where(prop, '=', val);
  }

}