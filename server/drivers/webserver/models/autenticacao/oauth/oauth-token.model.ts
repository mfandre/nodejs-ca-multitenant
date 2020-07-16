import { Property } from "@tsed/common";

export class OAuthToken {

  @Property()
  // tslint:disable-next-line:variable-name
  access_token: string;

  @Property()
  // tslint:disable-next-line:variable-name
  token_type: string;

  @Property()
  // tslint:disable-next-line:variable-name
  expires_in: number;

  @Property()
  scope: string;

  @Property()
  tipo: string;

  @Property()
  statusCadastro: string;

  @Property()
  trocarSenha: boolean;

  @Property()
  nome: string;

  @Property()
  id: string;

  @Property()
  jti: string;

}