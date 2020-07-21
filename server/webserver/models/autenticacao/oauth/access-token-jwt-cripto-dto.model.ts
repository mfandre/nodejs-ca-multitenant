import { Property } from "@tsed/common";

export class AccessTokenJwtCriptoDTO {

  @Property()
  tipo: string;

  @Property()
  // tslint:disable-next-line:variable-name
  user_name: string;

  @Property()
  scope: string[];

  @Property()
  statusCadastro: string;

  @Property()
  trocarSenha: boolean;

  @Property()
  nome: string;

  @Property()
  id: number;

  @Property()
  exp: number;

  @Property()
  authorities: string[];

  @Property()
  jti: string;

  @Property()
  // tslint:disable-next-line:variable-name
  client_id;

}