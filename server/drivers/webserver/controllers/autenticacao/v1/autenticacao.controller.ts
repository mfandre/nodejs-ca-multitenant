import {Controller, Get, Post, BodyParams} from "@tsed/common";
import { UsuarioService } from "./../../../services/autenticacao/usuario.service";
import { NotFound } from "@tsed/exceptions";

@Controller("/autenticacao")
export class LoginController {

  // TODO precisa ser recuperado da request
  private tenant = 'dev';

  constructor(private readonly usuarioService: UsuarioService) {}

  @Post("/login")
  login( @BodyParams() credenciais: {email, password} ) {
    const email = credenciais.email;
    const senha = credenciais.password;

    return this.usuarioService.login(this.tenant, email, senha);
  }

  @Get("/auth")
  auth() {
    return this.usuarioService.listarUsuarios(this.tenant);
  }

  @Post("/register")
  register() {
    return "register";
  }
}