import { Property } from '@tsed/common';

import { BaseModel } from './../../../../../core/mvc/base-model';
import { table, id } from '../../../../../core/decorators/entity.decorator';

@table('pssoa')
export class PssoaV2 extends BaseModel {

  @id('cd_pssoa')
  cdPssoa: string;

  @Property()
  nmPssoa: string;

  @Property()
  nmPssoaFoto: string;

  @Property()
  imgPssoaAssinatura: string;

  @Property()
  nmPssoaAvatar: string;

  @Property()
  nmPssoaLogin: string;

  @Property()
  nmPssoaSenha: string;

  @Property()
  nmPssoaEmail: string;

  @Property()
  tpPssoa: string;

  @Property()
  stPssoa: string;

  @Property()
  uid: string;

  @Property()
  cdPrfa: string;

  @Property()
  cdPssoaGstor: string;

  @Property()
  cdEmpsaClent: string;

  @Property()
  stPssoaCad: string;

  @Property()
  cdEspmd: string;

  @Property()
  cdPrfac: string;

  @Property()
  idPssoaSexo: string;

  @Property()
  dtUltimoLogin: string;

}