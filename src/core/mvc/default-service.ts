import { Request } from 'express';
import { NotFound } from '@tsed/exceptions';

import { DefaultRepository } from './default-repository';


export class DefaultService<T> {

  constructor(private repositorio: DefaultRepository<T>) {}

  private request: Request;

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
  public _listar(clazz): Promise<T> {
    this.repositorio.setRequest(this.getRequest());

    return this.repositorio._listar(clazz);
  }

  public _buscarId(clazz, id: number): Promise<T> {
    this.repositorio.setRequest(this.getRequest());

    return this.repositorio._buscarId(clazz, id);
  }

  public _buscarPor(clazz, prop, val): Promise<T[]> {
    this.repositorio.setRequest(this.getRequest());

    return this.repositorio._buscarPor(clazz, prop, val);
  }

  public _inserir(clazz, requestData: T): Promise<T[]> {
    this.repositorio.setRequest(this.getRequest());

    // monta objeto com valores da request
    const insertObj: typeof clazz = {};
    const propKeys = Object.keys(requestData);
    for ( const propKey of propKeys ) {
      insertObj[propKey] = requestData[propKey];
    }

    // salvar e retornar dados
    return this.repositorio._inserir(clazz, insertObj);
  }

  public _deletar(clazz, id: number): Promise<number> {
    this.repositorio.setRequest(this.getRequest());

    return this.repositorio._deletar(clazz, id)
                           .then(data => {
                             if ( data === 0) {
                              throw (new NotFound('Objeto não encontrado'));
                             }

                             return data;
                           });
  }

  public _atualizar(clazz, id: number, requestData: T): Promise<T[]> {
    return this._buscarId(clazz, id)
               .then(data => {
                  if ( !data ) {
                    throw (new NotFound('Objeto não encontrado'));
                  }

                  // monta objeto com valores da request
                  const updateObj: typeof clazz = {};
                  const propKeys = Object.keys(requestData);
                  for ( const propKey of propKeys ) {
                    updateObj[propKey] = requestData[propKey];
                  }

                  // salvar e retornar dados
                  return this.repositorio._atualizar(clazz, id, updateObj);
              });
  }

}
