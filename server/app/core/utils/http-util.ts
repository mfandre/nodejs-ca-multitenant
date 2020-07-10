import { Response, Request } from 'express';
import { Pagina } from "./paginator/pagina.model";

export class HttpUtil {

  // public static adicionarIndex(elementos: Array<any>): Array<any> {
  //   let index = 0;
  //   elementos.forEach(elemento => {
  //     elemento['index'] = index++;
  //   });
  //   return elementos;
  // }

  public static paginarResponse(elementos: Array<any>, req: Request): Pagina {
    const pagina = new Pagina();

    let paginaAtual: number;
    try {
      paginaAtual = req.query.pagina ? +req.query.pagina : 1; 
    }
    catch (e){ paginaAtual = 0; }

    const ultimoElemento      = ( (paginaAtual-1) * Pagina.TAMANHO_PAGINA_DEFAULT) + 1;

    pagina.totalElementos = elementos.length;

    if ( pagina.totalElementos === 1 && elementos[0] === null ) {
      pagina.totalElementos = 0;
      pagina.conteudo = null;
      pagina.paginaAtual = 0;
    }
    else {
      pagina.quantidadePaginas = Math.ceil(( pagina.totalElementos / Pagina.TAMANHO_PAGINA_DEFAULT ));
      
      const _elementos = elementos.slice(ultimoElemento - 1, 
                                        (ultimoElemento - 1 + Pagina.TAMANHO_PAGINA_DEFAULT));
  
      pagina.conteudo = _elementos;
  
      pagina.paginaAtual = paginaAtual;
    }

    return pagina;
  }

}