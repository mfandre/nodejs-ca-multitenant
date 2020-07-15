import { Service } from "@tsed/common";

import { UsuarioRepositorio } from './../../repositories/autenticacao/usuario/sql/usuario.repositorio';

@Service()
export class UsuarioService {

  constructor(private readonly usuarioRepositorio: UsuarioRepositorio) {
  }

  public listarUsuarios(tenant: string): any {
    return this.usuarioRepositorio.listarUsuarios('dev');
  }

}