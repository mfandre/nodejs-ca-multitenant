import { Request } from 'express';
import * as Knex from 'knex';
import 'reflect-metadata';

import { ConnectionManager } from './../../core/db/sql/connection-manager';
import { BaseModel } from './base-model';
import { Reflection } from './../config/reflection-constants';

const config = require('./../../core/config');


export class DefaultRepository<T> {

  private conn: Knex;
  private request: Request;
  private url: string;


  public setUrl(url: string): DefaultRepository<T> {
    this.url = url;

    return this;
  }

  public getConn(): Knex {
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

      this.conn = ConnectionManager.getInstance()
                                   .getConnectionByKeyDS(keyds);

      // nova tentativa de conexão
      if ( !this.conn ) {
        // KnexManager.getConnectionManager()
        //            .connectAllDb();

        // this.conn = KKnexManagernex.getConnectionManager()
        //                            .getConnectionByKeyDS(keyds);

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

  public setRequest(request: Request): any {
    this.request = request;

    return this;
  }





  /** *****************************
   * ******************************
   * MÉTODOS GERADOS COM REFLECTION
   * @param clazz Nome da classe
   * ******************************
   ******************************** */
  private _tableNotFoundMsg = 'Verifique se utilizou o decorator @table() no model.';

  public _listar<T extends BaseModel>(clazz): Promise<T> {
    const table = Reflect.getMetadata(Reflection.tableMetaKey, clazz);
    if ( !table ) {
      console.error(this._tableNotFoundMsg);

      return null;
    }

    // TODO: PAGINAR QUERY
    return this.getConn().select<T>('*')
                         .from(table)
                         .limit(config.database_options.LIMIT);
 }

  public _buscarId(clazz, id: number): Promise<T> {
    const table = Reflect.getMetadata(Reflection.tableMetaKey, clazz);
    if ( !table ) {
      console.error(this._tableNotFoundMsg);

      return null;
    }
    const o = new clazz();
    const idPropertie = Reflect.getMetadata(Reflection.idMetaKey, o) || 'id';

    return this.getConn().select<T>('*')
                         .from(table)
                         .where(idPropertie, '=', id)
                         .first();
  }


  public _buscarPorMultiValor(clazz, propVal): Promise<any> {
    const table = Reflect.getMetadata(Reflection.tableMetaKey, clazz);
    if ( !table ) {
      console.error(this._tableNotFoundMsg);

      return null;
    }

    return this.getConn().select('*')
                         .from(table)
                         .where(propVal);
  }

  public _buscarPor(clazz, prop, val): Promise<any> {
    const table = Reflect.getMetadata(Reflection.tableMetaKey, clazz);
    if ( !table ) {
      console.error(this._tableNotFoundMsg);

      return null;
    }

    return this.getConn().select('*')
                         .from(table)
                         .where(prop, '=', val);
  }

  public _inserir(clazz, insertObj: T): Promise<T[]> {
    const table = Reflect.getMetadata(Reflection.tableMetaKey, clazz);
    if ( !table ) {
      console.error(this._tableNotFoundMsg);

      return null;
    }

    return this.getConn()(table)
               .insert(insertObj)
               .returning('*');
  }


  public _deletar(clazz, id: number): Promise<number> {
    const table = Reflect.getMetadata(Reflection.tableMetaKey, clazz);
    if ( !table ) {
      console.error(this._tableNotFoundMsg);

      return null;
    }

    const o = new clazz();
    const idPropertie = Reflect.getMetadata(Reflection.idMetaKey, o) || 'id';

    return this.getConn()
               .from(table)
               .where(idPropertie, '=', id)
               .del();
  }


  public _atualizar(clazz, id: number, updateObj: T): Promise<T[]> {
    const table = Reflect.getMetadata(Reflection.tableMetaKey, clazz);
    if ( !table ) {
      console.error(this._tableNotFoundMsg);

      return null;
    }

    const o = new clazz();
    const idPropertie = Reflect.getMetadata(Reflection.idMetaKey, o) || 'id';

    return this.getConn()
               .from(table)
               .where(idPropertie, '=', id)
               .update(updateObj)
               .returning('*');
  }




}