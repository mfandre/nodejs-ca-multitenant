import { Request, Response, NextFunction } from "express";
import {Controller, Post, BodyParams, ReturnType, Req, Res, Next } from "@tsed/common";
import { BadRequest } from "@tsed/exceptions";

import { UsuarioService } from "./../../../services/autenticacao/usuario.service";
import { OAuthTokenResponseDTO } from "./../../../models/autenticacao/oauth/oauth-token-response-dto.model";


@Controller("/autenticacao")
export class AutenticacaoController {

  constructor(private usuarioService: UsuarioService) {}

  @Post("/oauth/token")
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
      throw (new BadRequest("grant_type não informado corretamente"));
    }
  }

}