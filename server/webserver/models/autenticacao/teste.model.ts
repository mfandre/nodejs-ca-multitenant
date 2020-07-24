import { Table } from './../../../core/decorators/table.decorator';


@Table('teste')
export class Teste {

  id: number;

  nome: string;

  descricao: string;

}