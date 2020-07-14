import {Controller, Get, Post} from "@tsed/common";

@Controller("/autenticacao")
export class LoginController {

  @Post("/login")
  login() {
    return "login";
  }

  @Get("/auth")
  auth() {
    return "auth";
  }

  @Post("/register")
  register() {
    return "register";
  }
}