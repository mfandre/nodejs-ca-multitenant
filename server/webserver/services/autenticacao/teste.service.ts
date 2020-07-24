import { Service } from '@tsed/common';

import { TesteRepositorio } from './../../repositories/autenticacao/teste.repositorio';
import { Teste } from './../../models/autenticacao/teste.model';
import { DefaultService } from './../../../core/mvc/default-service';


@Service()
export class TesteService extends DefaultService<Teste> {
  constructor(private testeRepositorio: TesteRepositorio) {
    super(testeRepositorio);
  }
}