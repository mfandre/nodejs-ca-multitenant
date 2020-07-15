import { Service } from "@tsed/common";

import { UsuarioRepositorio } from './../../repositories/autenticacao/usuario/sql/usuario.repositorio';

@Service()
export class UsuarioService {

  constructor(private readonly usuarioRepositorio: UsuarioRepositorio) {
  }

  public login(tenant: string, valor: string, email: string )  {

    const usuarios = this.usuarioRepositorio.buscarUsuarioPor(tenant, 'email', email);


    return usuarios;
  }

  public listarUsuarios(tenant: string): any {
    return this.usuarioRepositorio.listarUsuarios(tenant);
  }

}