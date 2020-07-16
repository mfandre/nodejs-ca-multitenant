import { Injectable } from "@tsed/common";
import { Inject, Scope, ProviderScope} from "@tsed/di";

import { MyKnex } from "../../../../../../db/sql/my-knex";
import { Usuario } from './../../../../models/autenticacao/usuario/usuario.model';

export const KEYDS = Symbol.for("KEYDS");


@Injectable()
@Scope(ProviderScope.REQUEST)
export class UsuarioRepositorio {

  public conn = null;

  public constructor(@Inject(KEYDS) keyds: any) {

    console.log('.');
    console.log('injected keyds: ' + keyds);
    console.log('.');

    const knex = new MyKnex();
    this.conn = knex.getConnectionManager()
                    .getConnectionByKeyDS(keyds);

    if ( this.conn ) {
      console.log('connection is not null...');
    }
  }



  public listarUsuarios = (tenant) => {
    return this.conn.raw(`SELECT * FROM [user];`)
                    .then(data => data.rows);
  }

  public buscarUsuarioPor = (tenant, prop, val): Promise<Usuario[]> => {
    return this.conn.select('*')
                    .from('user')
                    .where(prop, '=', val);
  }

  public buscarUsuarioV2Por = (tenant, val): Promise<Usuario[]> => {
    return this.conn.select('*')
                    .from('pssoa')
                    .where('nm_pssoa_email', '=', val);
  }


}
