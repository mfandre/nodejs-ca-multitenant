import { Injectable } from "@tsed/common";

@Injectable()
export class UsuarioRepositorio {

  public knex = require('./../../../../../../db/sql/knex');

  public listarUsuarios = (tenant) => {
    console.log('usuario-repositorio', 'listarUsuarios');

    if ( this.knex ) {
      console.log('KNEX CONECTADO, slug: ' + tenant);
    }
    else {
      console.log('KNEX NAO CONECTADO');
    }

    return this.knex.getConnectionBySlug(tenant).raw(`SELECT * FROM [user];`)
                    .then(data => data.rows);
  }


}
