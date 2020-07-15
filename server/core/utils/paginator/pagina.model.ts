export class Pagina {

  static TAMANHO_PAGINA_DEFAULT = 10;

  conteudo: any;
  paginaAtual: number;
  tamanhoPagina: number;
  totalElementos: number;
  quantidadePaginas: number;

  constructor() {
    this.tamanhoPagina = Pagina.TAMANHO_PAGINA_DEFAULT;
  }

}