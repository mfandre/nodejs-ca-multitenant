import {Controller, Get, Post} from "@tsed/common";
import { UsuarioService } from "./../../../services/autenticacao/usuario.service";

@Controller("/autenticacao")
export class LoginController {

  constructor(private readonly usuarioService: UsuarioService) {
  }

  @Post("/login")
  login() {
    return "login";
  }

  @Get("/auth")
  auth() {

    if ( this.usuarioService ) {
      console.log('USUARIO SERVICE IS NOT NULL');

      return this.usuarioService.listarUsuarios('dev');
    }
    else {
      console.log('USUARIO SERVICE IS NULL');

      return "usuarioService is null";
    }
  }

  @Post("/register")
  register() {
    return "register";
  }
}