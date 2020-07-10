import { Request, Response } from "express";

export class AutenticacaoRotaImpl {

  constructor() {
    console.log('AutenticacaoRotaImpl constructor');
  }

  public teste(req: Request, res: Response, next: any) {
    console.log('rotaImpl');
    res.send('teste 1');
  }

  public testes = (req: Request, res: Response, next: any) => {
    console.log('rotaImpl');
    res.send('teste 2');
  }

}