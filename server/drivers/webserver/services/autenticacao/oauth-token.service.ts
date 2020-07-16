import { Response } from "express";
import { Service } from "@tsed/common";

import { OAuthToken } from '../../models/autenticacao/oauth/oauth-token.model';
import { Usuario } from './../../models/autenticacao/usuario/usuario.model';

const jwt = require('jsonwebtoken');
const config = require('../../../../config');


@Service()
export class OAuthTokenService {

  public criarOAuthToken( usuario: Usuario ): OAuthToken {
    const jwtOptions = {
      expiresIn: config.oauthJwt.ACCESS_TOKEN_EXPIRES_MILLI
    };
    usuario.password = '';
    const accessToken = jwt.sign(usuario, config.oauthJwt.JWT_PW, jwtOptions);

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
    const jwtOptions = {
      expiresIn: config.oauthJwt.REFRESH_TOKEN_EXPIRES_MILLI
    };
    usuario.password = '';
    const refreshToken = jwt.sign(usuario, config.oauthJwt.JWT_PW, jwtOptions);

    return refreshToken;
  }

  public injetarRefreshTokenNoCookie(refreshToken: string, res: Response): void {
    const options = {
      maxAge: config.oauthJwt.REFRESH_TOKEN_COOKIE_MAXAGE_MILLI,
      httpOnly: true
    };
    res.cookie('refresh_token', refreshToken, options);
  }

}