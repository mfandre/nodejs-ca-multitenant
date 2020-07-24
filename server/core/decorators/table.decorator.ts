import 'reflect-metadata';
import { applyDecorators } from '@tsed/core';
import { Schema } from '@tsed/common';

import { Reflection } from './../config/reflection-constants';


export function Table(name: string) {
  return function (constructor: Function) {
    Reflect.defineMetadata(Reflection.tableMetaKey, name, constructor);

    applyDecorators(
      Schema({title: name})
    );
  };
}