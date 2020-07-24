import 'reflect-metadata';
import { applyDecorators } from '@tsed/core';
import { Schema } from '@tsed/common';
import { Property } from '@tsed/common';

import { Reflection } from '../config/reflection-constants';


export function id(name?: string): Function {
  return function (target: any, propertyKey: string): void {
    const _propertyKey = name || propertyKey;

    Reflect.defineMetadata(Reflection.idMetaKey, _propertyKey, target);

    applyDecorators(
      Property()
    );
  };
}

export function table(name: string): Function {
  return function (constructor: Function): void {
    Reflect.defineMetadata(Reflection.tableMetaKey, name, constructor);

    applyDecorators(
      Schema({title: name})
    );
  };
}

export function column(name: string): Function {
  return function (target: any, propertyKey: string): void {
    Reflect.defineMetadata(Reflection.columnMetaKey, name, target);
  };
}

// export function persist(target: any, propertyKey: string) {
//   let objectProperties: string[] = Reflect.getMetadata("entity:properties", target) || [];
//   if (!objectProperties.includes(propertyKey)) {
//       objectProperties.push(propertyKey);
//       Reflect.defineMetadata("entity:properties", objectProperties, target);
//   }
// }
