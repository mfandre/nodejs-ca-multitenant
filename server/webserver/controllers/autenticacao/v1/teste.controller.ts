import { Request, Response, NextFunction } from 'express';
import { Controller, Post, BodyParams, ReturnType, Req, Res, Next, Get, PlatformRouter } from '@tsed/common';
import { BadRequest } from '@tsed/exceptions';
import { Unauthorized } from '@tsed/exceptions';

import { PssoaV2Service } from './../../../services/autenticacao/legado/pssoa-v2.service';
import { TesteService } from './../../../services/autenticacao/teste.service';
import { DefaultController } from './../../../../core/mvc/default-controller';
import { Teste } from './../../../models/autenticacao/teste.model';
import { PssoaV2 } from 'webserver/models/autenticacao/usuario/legado/pssoa-v2.model';


@Controller(`/teste/v1`)
export class AutenticacaoController extends DefaultController<Teste> {

  constructor(router: PlatformRouter,
              private testeService: TesteService,
              private pssoav2Service: PssoaV2Service ) {
    super(router, testeService, Teste);
  }

  @Get('/teste-perm')
  // @CustomAuth( { scopes: [ChavePermissao.TESTE] })
  testePerm( @Req() req: Request,
             @Res() res: Response,
             @Next() next: NextFunction) {

    res.send('Parabéns, você está autorizado!');
  }
}