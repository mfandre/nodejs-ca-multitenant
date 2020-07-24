import { Property } from '@tsed/common';

import { table } from '../../../../../core/decorators/entity.decorator';

@table('prfac')
export class PrfacV2 {

  @Property()
  cdPrfac: number;

  @Property()
  nmPrfac: string;

  @Property()
  stPrfac: string;

  @Property()
  usrReg: string;

}