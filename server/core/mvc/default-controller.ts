import { PlatformRouter } from '@tsed/common';

import { DefaultService } from './default-service';
import { BaseModel } from './base-model';
import { ErrorUtil } from '../utils/error-util';


export class DefaultController<T> {

  constructor(private router: PlatformRouter,
              private service: DefaultService<T>,
              private clazz: any
    ) {
      console.log(`construindo controller automático... => ${clazz.name}`);
      this.criarRotasCRUD(clazz);
    }

  public criarRotasCRUD<M extends BaseModel>(clazz: M) {

    // INSERT
    this.router.post('/', (req, res) => {
      // TODO: implementar
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
      this.service._buscarId(clazz, +req.params.id)
             .then(data => res.send(data))
             .catch(error => {
              ErrorUtil.sendHttpException(res, error);
             });

    });

    // UPDATE
    this.router.put('/:id', (req, res) => {
      // TODO: implementar
    });

    // DELETE
    this.router.delete('/:id', (req, res) => {
      // TODO: implementar
    });


  }

}