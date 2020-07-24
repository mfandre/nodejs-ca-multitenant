import { TesteService } from './../../webserver/services/autenticacao/teste.service';
import { Request } from 'express';

import { DefaultRepository } from './default-repository';
import { BaseModel } from './base-model';



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

  public _inserir(clazz, o: T): T {
    // TODO: implementar
    console.error('nâo implementado.');

    return null;
  }

  public _deletar(clazz, id: number): Promise<number> {
    this.repositorio.setRequest(this.getRequest());

    return this.repositorio._deletar(clazz, id);
  }


}
