import { Injectable } from '@tsed/common';

import { DefaultRepository } from '../../../../../../core/mvc/default-repository';
import { PssoaV2 } from '../../../../../models/autenticacao/usuario/legado/pssoa-v2.model';

@Injectable()
export class PssoaV2Repositorio extends DefaultRepository<PssoaV2> {
}