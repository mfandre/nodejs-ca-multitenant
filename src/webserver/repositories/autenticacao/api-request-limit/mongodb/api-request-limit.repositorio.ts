import { Injectable } from '@tsed/common';

import { ApiRequestLimitModel, ApiRequestLimit } from './../../../../models/autenticacao/api-request-limit/api-request-limit.model';

@Injectable()
export class ApiRequestLimitRepositorio {

  async inserir(o: ApiRequestLimit): Promise<any> {

    const a = await ApiRequestLimitModel.create(o as ApiRequestLimit);

    return a;
  }
}