import { Request, Response, NextFunction } from "express";
import {Controller, Get, Post, BodyParams, ReturnType, Req, Res, Next, UseBefore, Locals } from "@tsed/common";
import { Scope, ProviderScope} from "@tsed/di";
import { NotFound, BadRequest } from "@tsed/exceptions";

import { UsuarioService } from "../../../services/autenticacao/usuario.service";
import { OAuthToken } from "../../../models/autenticacao/oauth/oauth-token.model";
import { TesteMiddleware } from "./../../../middlewares/teste-middleware";

const getNamespace = require('continuation-local-storage').getNamespace;

@Controller("/autenticacao")
// @UseBefore(TesteMiddleware)
@Scope(ProviderScope.REQUEST)
export class AutenticacaoController {

  // TODO precisa ser recuperado da request
  private tenant = '';

  constructor(private usuarioService: UsuarioService) {
    // const session = getNamespace('namespaceRequestScope');


    // if ( session ) {
    //   const _keyds = session.get('keyds');
    //   console.log('keyds from session: ' + _keyds);
    //   session.run(() => {
    //     const keyds = session.get('keyds');
    //     console.log('keyds from session: ' + keyds);
    //   });
    // }
  }

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