import { BaseModel } from './../../../core/mvc/base-model';
import { table, id, column } from './../../../core/decorators/entity.decorator';


@table('teste')
export class Teste extends BaseModel {

  id: number;

  @id('cd_teste')
  cdTeste: number;

  nome: string;

  descricao: string;

}