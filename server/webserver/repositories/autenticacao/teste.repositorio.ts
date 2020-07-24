import { Teste } from './../../models/autenticacao/teste.model';
import { DefaultRepository } from './../../../core/mvc/default-repository';
import { Injectable } from '@tsed/common';

@Injectable()
export class TesteRepositorio extends DefaultRepository<Teste> {
}