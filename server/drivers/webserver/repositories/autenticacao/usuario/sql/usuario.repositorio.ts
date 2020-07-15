import { Injectable } from "@tsed/common";

@Injectable()
export class UsuarioRepositorio {

  public knex = require('./../../../../../../db/sql/knex');

  public listarUsuarios = (tenant) => {
    return this.knex.getConnectionBySlug(tenant).raw(`SELECT * FROM [user];`)
                    .then(data => data.rows);
  }


}
