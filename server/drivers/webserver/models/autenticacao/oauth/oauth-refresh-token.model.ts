import { OAuthToken } from './oauth-token.model';
import { Property } from '@tsed/common';

export class OAuthRefreshToken extends OAuthToken {


  @Property()
  // tslint:disable-next-line:variable-name
  client_id: string;

  @Property()
  // tslint:disable-next-line:variable-name
  user_name: string;

  @Property()
  ati: string;

  @Property()
  authorities: string[];



}