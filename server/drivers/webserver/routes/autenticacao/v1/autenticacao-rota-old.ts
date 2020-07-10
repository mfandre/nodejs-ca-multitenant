import * as express from 'express';

let usersDb = require('./../../../../../data-access/users-db')
//  ../../../../data-access/users-db

const jwt = require('jsonwebtoken');
const config = require('../../../../../config')

export class AutenticacaoRota {

  constructor() {
    console.log('constructor...');
  }

  private router: express.Router;

  // constructor(router: any) {
  //   this.router = router;
  // }

  inicializarRota() {

    this.router.use('/v1/autenticacao', this.router);

    this.router.get('/login', (req, res) => {
      const { email, password } = req.body;
      const slug = req.headers.slug;
  
      console.log('testes autenticacao-rota... ' + slug );
    
      usersDb.findUsersBy(slug, 'email', email).then( (data: any) => {
        if (data.length != 1 || password !== data[0].password){
          res.status(401).send();
          return;
        }
        data[0].password = undefined;
        const token = jwt.sign(data[0], config.JWT_PW);
        res.status(200).send({ userData: data[0], token });
      }).catch( (error: any) => {
        console.error(error);
        res.status(500).send();
      })      
    });

    return this.router;
  }
}

// module.exports = AutenticacaoRota; 
