import { Injectable } from '@tsed/common';

import { DefaultRepository } from './../../../../../core/mvc/default-repository';
import { Usuario } from './../../../../models/autenticacao/usuario/usuario.model';


@Injectable()
export class UsuarioRepositorio extends DefaultRepository<Usuario> {

  // public listarUsuarios = () => {
  //   return this.getConn().select('*')
  //                        .from('pssoa')
  //                        .limit(10);
  // }

  // public buscarUsuarioPor = (prop, val): Promise<Usuario[]> => {
  //   return this.getConn().select('*')
  //                        .from('user')
  //                        .where(prop, '=', val);
  // }

  // public buscarUsuarioV2Por = (val): Promise<Usuario[]> => {
  //   return this.getConn().select('*')
  //                        .from('pssoa')
  //                        .where('nm_pssoa_email', '=', val);
  // }

}
