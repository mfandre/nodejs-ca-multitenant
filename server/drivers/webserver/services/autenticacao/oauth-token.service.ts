import { Service } from "@tsed/common";

import { OAuthToken } from './../../models/autenticacao/oauth/token.model';
import { Usuario } from './../../models/autenticacao/usuario/usuario.model';

const jwt = require('jsonwebtoken');
const config = require('../../../../config');


@Service()
export class OAuthTokenService {

  public criarOAuthToken( usuario: Usuario ): OAuthToken {

    usuario.password = '';
    const accessToken = jwt.sign(usuario, config.JWT_PW);

    const token = new OAuthToken();
    token.access_token = accessToken;
    token.token_type = 'bearer';
    token.scope = 'read write';
    token.tipo = 'U';
    token.statusCadastro = 'C';
    token.trocarSenha = false;
    token.nome = usuario.name;
    token.id = '' + usuario.id;
    token.jti = '';

    return token;
  }

  public criarRefreshToken(usuario: Usuario): string {
    usuario.password = '';
    const refreshToken = jwt.sign(usuario, config.JWT_PW);

    return refreshToken;
  }

}