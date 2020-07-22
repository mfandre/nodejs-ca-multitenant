import {IAuthOptions, UseAuth} from '@tsed/common';
import {applyDecorators} from '@tsed/core';
import {Operation, Responses, Security} from '@tsed/swagger';

import { SecurityMiddleware } from '../../webserver/middlewares/security-middleware';
import { ChavePermissao } from '../config/seguranca/chave-permissao.enum';
import { Role } from './../config/seguranca/role.enum';


export interface ICustomAuthOptions extends IAuthOptions {
  role?: string;
  scopes?: string[];
  // role?: Role;
  // scopes?: ChavePermissao[];
}

export function CustomAuth(options: ICustomAuthOptions = {}): Function {
  return applyDecorators(
    UseAuth(SecurityMiddleware, options),
    Security('oauth', ...(options.scopes || [])),
    Operation({
      'parameters': [
        {
          'in': 'header',
          'name': 'Authorization',
          'type': 'string',
          'required': true
        }
      ]
    }),
    Responses(401, {description: 'Unauthorized'}),
    Responses(403, {description: 'Forbidden'})
  );
}