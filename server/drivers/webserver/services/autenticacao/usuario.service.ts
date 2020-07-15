import { NotFound } from "@tsed/exceptions";
import { Service } from "@tsed/common";

const jwt = require('jsonwebtoken');
const config = require('../../../../config');

import { UsuarioRepositorio } from './../../repositories/autenticacao/usuario/sql/usuario.repositorio';
import { Usuario } from "drivers/webserver/models/autenticacao/usuario/usuario.model";

@Service()
export class UsuarioService {

  constructor(private readonly usuarioRepositorio: UsuarioRepositorio) {
  }

  public login(tenant: string, email: string, senha: string): Promise<any> {
     return this.usuarioRepositorio
                .buscarUsuarioPor(tenant, 'email', email)
                .then( (usuarios: Usuario[]) => {
                  if ( usuarios.length !== 1 ) {
                    throw (new NotFound("Usuário não encontrado"));
                  }
                  const usuario = usuarios[0];

                  if ( usuario && usuario.password === senha ) {
                    usuario.password = '';
                    const token = jwt.sign(usuario, config.JWT_PW);

                    return { userData: usuario, token };
                  }
                });
  }

  public listarUsuarios(tenant: string): any {
    return this.usuarioRepositorio.listarUsuarios(tenant);
  }

}