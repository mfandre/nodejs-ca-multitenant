import { Property } from '@tsed/common';

import { Table } from '../../../../../core/decorators/table.decorator';

@Table('prfac')
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