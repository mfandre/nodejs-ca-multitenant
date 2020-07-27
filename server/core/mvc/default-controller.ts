import { PlatformRouter } from '@tsed/common';

import { DefaultService } from './default-service';
import { BaseModel } from './base-model';
import { ErrorUtil } from '../utils/error-util';

const logger = require('winston');

export class DefaultController<T> {

  constructor(private router: PlatformRouter,
              private service: DefaultService<T>,
              private clazz: any
    ) {
      logger.debug(`construindo controller automático... => ${clazz.name}`);

      this.criarRotasCRUD(clazz);
    }

  public criarRotasCRUD<M extends BaseModel>(clazz: M): void {

    // INSERT
    this.router.post('/', (req, res) => {
      this.service.setRequest(req);
      this.service._inserir(clazz, req.body)
                  .then(data => res.send(data))
                  .catch(error => {
                    ErrorUtil.sendHttpException(res, error);
                  });

    });

    // LISTAR TODOS
    this.router.get('/', (req, res) => {
      this.service.setRequest(req);
      this.service._listar(clazz)
                  .then(data => res.send(data))
                  .catch(error => {
                    ErrorUtil.sendHttpException(res, error);
                  });
    });

    // BUSCAR POR ID
    this.router.get('/:id', (req, res) => {
      this.service.setRequest(req);
      this.service._buscarId(clazz, +req.params.id)
                  .then(data => res.send(data))
                  .catch(error => {
                    ErrorUtil.sendHttpException(res, error);
                  });

    });

    // BUSCAR POR PROPRIEDADE
    this.router.get('/:prop/:val', (req, res) => {
      this.service.setRequest(req);
      this.service._buscarPor(clazz, req.params.prop, req.params.val)
                  .then(data => res.send(data))
                  .catch(error => {
                    ErrorUtil.sendHttpException(res, error);
                  });
    });

    // UPDATE
    this.router.put('/:id', (req, res) => {
      this.service.setRequest(req);
      this.service._atualizar(clazz, +req.params.id, req.body)
                  .then(data => res.send(data))
                  .catch(error => {
                    ErrorUtil.sendHttpException(res, error);
                  });

    });

    // DELETE
    this.router.delete('/:id', (req, res) => {
      this.service.setRequest(req);
      this.service._deletar(clazz, +req.params.id)
                  .then(data => res.send(`${data} registro(s) removido(s)`))
                  .catch(error => {
                    ErrorUtil.sendHttpException(res, error);
                  });
    });


  }

}