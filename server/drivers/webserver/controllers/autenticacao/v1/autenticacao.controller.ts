import { Request, Response, NextFunction } from "express";
import {Controller, Get, Post, BodyParams, ReturnType, Req, Res, Next} from "@tsed/common";
import { NotFound, BadRequest } from "@tsed/exceptions";

import { UsuarioService } from "../../../services/autenticacao/usuario.service";
import { OAuthToken } from "../../../models/autenticacao/oauth/oauth-token.model";

@Controller("/autenticacao")
export class AutenticacaoController {

  // TODO precisa ser recuperado da request
  private tenant = 'dev';

  constructor(private readonly usuarioService: UsuarioService) {}

  @Get("/list")
  auth() {
    return this.usuarioService.listarUsuarios(this.tenant);
  }


  @Post("/oauth/token")
  @ReturnType({type: OAuthToken})
  // tslint:disable-next-line:variable-name
  oauthToken( @Req() req: Request,
              @Res() res: Response,
              @Next() next: NextFunction,
              @BodyParams() params: {username, password, grant_type }) {

    if ( params.grant_type === 'password' ) {
      this.usuarioService.login(req, res, this.tenant, params.username, params.password)
                         .then( (data: OAuthToken) => {
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