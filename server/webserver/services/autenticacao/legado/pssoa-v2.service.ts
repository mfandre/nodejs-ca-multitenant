import { Service } from '@tsed/common';

import { PssoaV2Repositorio } from '../../../repositories/autenticacao/usuario/sql/legado/pssoa-v2.repositorio';
import { DefaultService } from '../../../../core/mvc/default-service';
import { PssoaV2 } from '../../../models/autenticacao/usuario/legado/pssoa-v2.model';


@Service()
export class PssoaV2Service extends DefaultService<PssoaV2> {

  constructor(private pssoav2Repositorio: PssoaV2Repositorio) {
    super(pssoav2Repositorio);
  }

}