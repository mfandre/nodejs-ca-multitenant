import { Service } from '@tsed/common';

import { PssoaV2Repositorio } from '../../../repositories/autenticacao/usuario/sql/legado/pssoa-v2.repositorio';
import { DefaultService } from '../../../../core/mvc/default-service';
import { PssoaV2 } from '../../../models/autenticacao/usuario/legado/pssoa-v2.model';


@Service()
export class PssoaV2Service extends DefaultService<PssoaV2> {

  constructor(private pssoav2Repositorio: PssoaV2Repositorio) {
    super(pssoav2Repositorio);
  }

  public static decriptarSenhaV2(senha: string): string {
    let lEnc = '';
    let lInt = 0;
    let lAux = 0;
    let lChar = 'a';

    for ( lInt = 0; lInt < senha.length; lInt++ ) {
      lAux = Math.floor(((lInt + 1) / 2));

      if ( lAux * 2 === ( lInt + 1 ) ) {
        lChar = senha.substring( lInt, lInt + 1 ).split('')[0];
        lEnc += String.fromCharCode(lChar.charCodeAt(0) - 5);
      }
      else {
        lChar = senha.substring( lInt, lInt + 1 ).split('')[0];
        lEnc += String.fromCharCode(lChar.charCodeAt(0) - 3);
      }
    }

    return lEnc;
  }

}