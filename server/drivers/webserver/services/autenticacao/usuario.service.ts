import { Response } from "express";
import { NotFound } from "@tsed/exceptions";
import { Service } from "@tsed/common";

import { UsuarioRepositorio } from './../../repositories/autenticacao/usuario/sql/usuario.repositorio';
import { Usuario } from "drivers/webserver/models/autenticacao/usuario/usuario.model";
import { OAuthToken } from "../../models/autenticacao/oauth/oauth-token.model";
import { OAuthTokenService } from "./oauth-token.service";
import { DefaultService } from "../../../../core/mvc/default-service";

@Service()
export class UsuarioService extends DefaultService<Usuario> {

  constructor(private oauthTokenService: OAuthTokenService,
              private usuarioRepositorio: UsuarioRepositorio) {
    super();
  }

  public login(res: Response,
               email: string,
               senha: string): Promise<OAuthToken> {

     return this.usuarioRepositorio
                .setRequest(super.getRequest())
                .buscarUsuarioPor('email', email)
                .then( (usuarios: Usuario[]) => {
                  if ( usuarios.length !== 1 ) {
                    throw (new NotFound("Objeto não encontrado"));
                  }
                  const usuario = usuarios[0];

                  if ( usuario && usuario.password === senha ) {
                    const oauthToken: OAuthToken = this.oauthTokenService.criarOAuthToken(usuario);
                    const refreshToken = this.oauthTokenService.criarRefreshToken(usuario);
                    this.oauthTokenService.injetarRefreshTokenNoCookie(refreshToken, res);

                    return oauthToken;
                  }
                });
  }

}