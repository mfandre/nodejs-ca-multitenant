import { PssoaV2Service } from './legado/pssoa-v2.service';
import { Response } from 'express';
import { NotFound, Unauthorized } from '@tsed/exceptions';
import { Service } from '@tsed/common';

import { UsuarioRepositorio } from './../../repositories/autenticacao/usuario/sql/usuario.repositorio';
import { Usuario } from './../../models/autenticacao/usuario/usuario.model';
import { OAuthTokenResponseDTO } from '../../models/autenticacao/oauth/oauth-token-response-dto.model';
import { OAuthTokenService } from './oauth-token.service';
import { DefaultService } from './../../../core/mvc/default-service';

@Service()
export class UsuarioService extends DefaultService<Usuario> {

  constructor(private oauthTokenService: OAuthTokenService,
              private usuarioRepositorio: UsuarioRepositorio) {
    super(usuarioRepositorio);
  }

  public login(res: Response,
               login: string,
               senha: string): Promise<OAuthTokenResponseDTO> {

     return this.usuarioRepositorio
                .setRequest(super.getRequest())
                ._buscarPorMultiValor(Usuario, {
                  nm_pssoa_login: login,
                  st_pssoa: 'A'
                })
                .then( (usuarios: Usuario[]) => {
                  if ( usuarios.length !== 1 ) {
                    // throw (new NotFound('Objeto não encontrado'));
                    throw (new Unauthorized('Credencial não autorizada'));
                  }
                  const usuario = usuarios[0];

                  if ( PssoaV2Service.decriptarSenhaV2(usuario['NM_PSSOA_SENHA'])  !== senha ) {
                    throw (new Unauthorized('Credencial não autorizada'));
                  }

                  const oauthTokenResponseDTO: OAuthTokenResponseDTO = this.oauthTokenService.criarAcessToken(usuario);
                  const refreshToken = this.oauthTokenService.criarRefreshToken(usuario);
                  this.oauthTokenService.injetarRefreshTokenNoCookie(refreshToken, res);

                  return oauthTokenResponseDTO;
                });
  }

}