import { Injectable } from "@tsed/common";

import { MyKnex } from "../../../../../../db/sql/my-knex";
import { Usuario } from './../../../../models/autenticacao/usuario/usuario.model';

@Injectable()
export class UsuarioRepositorio {

  private knex = new MyKnex();

  public listarUsuarios = (tenant) => {
    return this.knex.getConnectionManager()
                    .getConnectionBySlug(tenant)
                    .raw(`SELECT * FROM [user];`)
                    .then(data => data.rows);
  }

  public buscarUsuarioPor = (tenant, prop, val): Promise<Usuario[]> => {
    const conn = this.knex.getConnectionManager()
                          .getConnectionBySlug(tenant);

    return conn.select('*')
               .from('user')
               .where(prop, '=', val);
  }

  public buscarUsuarioV2Por = (tenant, val): Promise<Usuario[]> => {
    const conn = this.knex.getConnectionManager()
                          .getConnectionBySlug(tenant);

    return conn.select('*')
               .from('pssoa')
               .where('nm_pssoa_email', '=', val);
  }


}
