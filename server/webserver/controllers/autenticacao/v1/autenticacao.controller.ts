import { Request, Response, NextFunction } from 'express';
import { Controller, Post, BodyParams, ReturnType, Req, Res, Next, PlatformRouter } from '@tsed/common';
import { BadRequest } from '@tsed/exceptions';
import { Unauthorized } from '@tsed/exceptions';

import { PssoaV2Service } from './../../../services/autenticacao/legado/pssoa-v2.service';
import { UsuarioService } from './../../../services/autenticacao/usuario.service';
import { OAuthTokenResponseDTO } from './../../../models/autenticacao/oauth/oauth-token-response-dto.model';
import { ErrorUtil } from './../../../../core/utils/error-util';
import { OAuthTokenService } from './../../../services/autenticacao/oauth-token.service';
import { AccessTokenJwt } from './../../../../webserver/models/autenticacao/oauth/access-token-jwt.model';
import { Usuario } from './../../../../webserver/models/autenticacao/usuario/usuario.model';

@Controller(`/autenticacao/v1`)
export class AutenticacaoController {

  constructor(router: PlatformRouter,
              private usuarioService: UsuarioService,
              private oauthTokenService: OAuthTokenService) {}

  @Post('/oauth/token')
  @ReturnType({type: OAuthTokenResponseDTO})
  oauthToken( @Req() req: Request,
              @Res() res: Response,
              @Next() next: NextFunction,
              @BodyParams() params: {username, password, grant_type }) {

    if ( params.grant_type === 'password' ) {
      this.usuarioService.setRequest(req);
      this.usuarioService.login(res, params.username, params.password)
                         .then( (data: OAuthTokenResponseDTO) => {
                            res.send(data);
                         })
                         .catch(error => {
                           ErrorUtil.sendHttpException(res, error);
                         });
    }
    else if ( params.grant_type === 'refresh_token' ) {
      if ( req.cookies ) {
        const refreshTokenCookie = req.cookies['refresh_token'];

        const tokenJwt: AccessTokenJwt = this.oauthTokenService.validarToken(refreshTokenCookie);
        if ( tokenJwt ) {
          const usuario: Usuario = {
            id: tokenJwt.id,
            name: tokenJwt.nome,
            email: tokenJwt.user_name,
            password: ''
          };

          const oauthTokenResponseDTO: OAuthTokenResponseDTO = this.oauthTokenService.criarAcessToken(usuario);
          const refreshToken = this.oauthTokenService.criarRefreshToken(usuario);
          this.oauthTokenService.injetarRefreshTokenNoCookie(refreshToken, res);
          res.send(oauthTokenResponseDTO);
        }
        else {
          throw (new Unauthorized('Credencial não autorizada'));
        }
      }
    }
    else {
      throw (new BadRequest('grant_type não informado corretamente'));
    }
  }

}