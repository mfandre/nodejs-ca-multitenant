import { Service } from "@tsed/common";

import { UsuarioRepositorio } from './../../repositories/autenticacao/usuario/sql/usuario.repositorio';

@Service()
export class UsuarioService {

  constructor(private readonly usuarioRepositorio: UsuarioRepositorio) {
  }

  public listarUsuarios(tenant: string): any {
    console.log('UsuarioService: listarUsuarios');

    if ( this.usuarioRepositorio ) {
      console.log(' USUARIO REPOSITORIO IS NOT NULL ');

      return this.usuarioRepositorio.listarUsuarios('dev');
    }
    else {
      console.log(' USUARIO REPOSITORIO IS NULL ');
    }

    // const usuarioRepositorio = new UsuarioRepositorio();
    // const listaUsuarios = usuarioRepositorio.listarUsuarios('dev');

    return "teste";
  }

}