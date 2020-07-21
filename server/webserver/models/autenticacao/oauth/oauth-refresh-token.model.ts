import { OAuthTokenResponseDTO } from './oauth-token-response-dto.model';
import { Property } from '@tsed/common';

export class OAuthRefreshToken extends OAuthTokenResponseDTO {

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