import { NotFound } from "@tsed/exceptions";
import { Service } from "@tsed/common";



import { UsuarioRepositorio } from './../../repositories/autenticacao/usuario/sql/usuario.repositorio';
import { Usuario } from "drivers/webserver/models/autenticacao/usuario/usuario.model";
import { OAuthToken } from "./../../models/autenticacao/oauth/token.model";
import { OAuthTokenService } from "./oauth-token.service";

@Service()
export class UsuarioService {

  constructor(
    private readonly oauthTokenService: OAuthTokenService,
    private readonly usuarioRepositorio: UsuarioRepositorio) {
  }



  public login(tenant: string, email: string, senha: string): Promise<OAuthToken> {
     return this.usuarioRepositorio
                .buscarUsuarioPor(tenant, 'email', email)
                .then( (usuarios: Usuario[]) => {
                  if ( usuarios.length !== 1 ) {
                    throw (new NotFound("Usuário não encontrado"));
                  }
                  const usuario = usuarios[0];

                  if ( usuario && usuario.password === senha ) {
                    return this.oauthTokenService.criarOAuthToken(usuario);
                  }
                });
  }

  public listarUsuarios(tenant: string): any {
    return this.usuarioRepositorio.listarUsuarios(tenant);
  }
}