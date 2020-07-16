import {Controller, Get, Post, BodyParams, ReturnType} from "@tsed/common";
import { UsuarioService } from "../../../services/autenticacao/usuario.service";
import { NotFound, BadRequest } from "@tsed/exceptions";
import { OAuthToken } from "./../../../models/autenticacao/oauth/token.model";

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
  oauthToken( @BodyParams() params: {username, password, grant_type }) {
    if ( params.grant_type === 'password' ) {
      return this.usuarioService.login(this.tenant, params.username, params.password);
    }

    throw (new BadRequest(""));
  }

}