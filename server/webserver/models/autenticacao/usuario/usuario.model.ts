import '@tsed/ajv';
import { Property } from '@tsed/common';

import { table, id } from './../../../../core/decorators/entity.decorator';


@table('pssoa')
export class Usuario {

  @id()
  id: number;

  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  password: string;

}