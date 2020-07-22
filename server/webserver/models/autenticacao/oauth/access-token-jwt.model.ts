import { Property } from '@tsed/common';

export class AccessTokenJwt {

/* Exemplo
  {
    "tipo": "U",
    "user_name": "admin",
    "scope": [
      "read",
      "write"
    ],
    "statusCadastro": "C",
    "trocarSenha": false,
    "nome": "TheBoss Tenant1",
    "id": 1,
    "authorities": [
      "ADM_EDICAO_CAMPOS"
    ],
    "jti": "",
    "client_id": "hmap",
    "exp": 1595435805114,
    "iat": 1595435795
  }
*/

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