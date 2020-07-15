import { Injectable } from "@tsed/common";
import { Usuario } from './../../../../models/autenticacao/usuario/usuario.model';

@Injectable()
export class UsuarioRepositorio {

  public knex = require('./../../../../../../db/sql/knex');


  public listarUsuarios = (tenant) => {
    return this.knex.getConnectionBySlug(tenant).raw(`SELECT * FROM [user];`)
                    .then(data => data.rows);
  }

  public buscarUsuarioPor = (tenant, prop, val): Usuario[] => {
    const conn = this.knex.getConnectionBySlug(tenant);


    // conn.select('*').from('user').where(prop, '=', val);

    conn.select('id').from('users');

    return null;
  }


}
