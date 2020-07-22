import '@tsed/ajv';
import { Property } from '@tsed/common';


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