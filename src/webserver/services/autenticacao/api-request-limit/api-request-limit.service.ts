import { Service } from '@tsed/common';

import { ApiRequestLimit } from './../../../models/autenticacao/api-request-limit/api-request-limit.model';
import { ApiRequestLimitRepositorio } from './../../../repositories/autenticacao/api-request-limit/mongodb/api-request-limit.repositorio';


@Service()
export class ApiRequestLimitService {

  constructor(private apiRequestLimitRepositorio: ApiRequestLimitRepositorio) {
  }

  async inserir(o: ApiRequestLimit): Promise<any> {
    return this.apiRequestLimitRepositorio.inserir(o);
  }

}