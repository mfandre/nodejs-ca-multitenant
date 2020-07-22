import { AccessTokenJwt } from './../models/autenticacao/oauth/access-token-jwt.model';
import { EndpointInfo, IMiddleware, Middleware, Req } from '@tsed/common';
import { Forbidden, Unauthorized } from '@tsed/exceptions';

import { OAuthTokenService } from './../services/autenticacao/oauth-token.service';

@Middleware()
export class SecurityMiddleware implements IMiddleware {

  constructor(private oauthTokenService: OAuthTokenService) {}

  public use(@Req() req: Req, @EndpointInfo() endpoint: EndpointInfo) {
    const options = endpoint.get(SecurityMiddleware) || {};

    const accessToken: AccessTokenJwt = this.oauthTokenService.getAccessTokenValido(req);
    if ( !accessToken ) {
      throw new Unauthorized('Não autorizado');
    }

    if ( !this.oauthTokenService.usuarioTemPermissao(accessToken, options.scopes) ) {
      throw new Forbidden('Sem permissão');
    }
  }

}