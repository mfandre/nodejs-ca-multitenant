import { Request, Response, NextFunction } from 'express';
import {Controller, Post, BodyParams, ReturnType, Req, Res, Next, Get, UseAuth } from '@tsed/common';
import { BadRequest } from '@tsed/exceptions';

import { PssoaV2Service } from './../../../services/autenticacao/legado/pssoa-v2.service';
import { PssoaV2 } from './../../../models/autenticacao/usuario/legado/pssoa-v2.model';
import { UsuarioService } from './../../../services/autenticacao/usuario.service';
import { OAuthTokenResponseDTO } from './../../../models/autenticacao/oauth/oauth-token-response-dto.model';
import { ErrorUtil } from './../../../../core/utils/error-util';

@Controller('/autenticacao/v1')
export class AutenticacaoController {

  constructor(private usuarioService: UsuarioService,
              private pssoav2Service: PssoaV2Service) {}

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
  // @CustomAuth( { scopes: [ChavePermissao.TESTE] })
  testePerm( @Req() req: Request,
             @Res() res: Response,
             @Next() next: NextFunction) {

    res.send('Parabéns, você está autorizado!');
  }


  @Get('/teste-reflection')
  testeReflection( @Req() req: Request,
                   @Res() res: Response,
                   @Next() next: NextFunction) {


  this.pssoav2Service.setRequest(req);
  this.pssoav2Service.listar(PssoaV2)
                     .then(data => {
                       res.send(data);
                     });
  }

}