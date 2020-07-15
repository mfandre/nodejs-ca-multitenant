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
    return this.usuarioService.listarUsuarios('dev');
  }

  @Post("/register")
  register() {
    return "register";
  }
}