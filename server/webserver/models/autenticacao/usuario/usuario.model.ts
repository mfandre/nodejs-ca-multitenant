import '@tsed/ajv';
import { Property } from '@tsed/common';

import { Table } from './../../../../core/decorators/table.decorator';


@Table('pssoa')
export class Usuario {

  @Property()
  id: number;

  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  password: string;

}