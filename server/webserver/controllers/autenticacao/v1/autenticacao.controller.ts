import { Request, Response, NextFunction } from 'express';
import {Controller, Post, BodyParams, ReturnType, Req, Res, Next, Get, UseAuth } from '@tsed/common';
import { BadRequest } from '@tsed/exceptions';

import { UsuarioService } from './../../../services/autenticacao/usuario.service';
import { OAuthTokenResponseDTO } from './../../../models/autenticacao/oauth/oauth-token-response-dto.model';
import { ErrorUtil } from './../../../../core/utils/error-util';
import { CustomAuth } from '../../../../core/decorators/custom-auth';
import { ChavePermissao } from '../../../models/autenticacao/perfil-permissao/chave-permissao.enum';
import { Role } from './../../../models/autenticacao/perfil-permissao/role.enum';
import { SecurityMiddleware } from './../../../middlewares/security-middleware';

@Controller('/autenticacao/v1')
export class AutenticacaoController {

  constructor(private usuarioService: UsuarioService) {}

  @Post('/oauth/token')
  @ReturnType({type: OAuthTokenResponseDTO})
  oauthToken( @Req() req: Request,
              @Res() res: Response,
              @Next() next: NextFunction,
              @BodyParams() params: {username, password, grant_type }) {

    if ( params.grant_type === 'password' ) {
      this.usuarioService.setRequest(req)
                         .login(res, params.username, params.password)
                         .then( (data: OAuthTokenResponseDTO) => {
                            res.send(data);
                         })
                         .catch(error => {
                           ErrorUtil.sendHttpException(res, error);
                         });
    }
    else if ( params.grant_type === 'refresh_token' ) {
      if ( req.cookies ) {
        req.cookies.forEach(cookie => {
          console.log(cookie);
        });
      }
    }
    else {
      throw (new BadRequest('grant_type não informado corretamente'));
    }
  }

  @Get('/teste-perm')
  @CustomAuth( { scopes: [ChavePermissao.TESTE] })
  testePerm( @Req() req: Request,
             @Res() res: Response,
             @Next() next: NextFunction) {

    res.send('Parabéns, você foi autorizado!');
  }

}