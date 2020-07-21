import { AccessTokenJwtCriptoDTO } from './../../models/autenticacao/oauth/access-token-jwt-cripto-dto.model';
import { Response } from "express";
import { Service } from "@tsed/common";

import { OAuthTokenResponseDTO } from '../../models/autenticacao/oauth/oauth-token-response-dto.model';
import { Usuario } from './../../models/autenticacao/usuario/usuario.model';

const jwt = require('jsonwebtoken');
const config = require('./../../../config');


@Service()
export class OAuthTokenService {

  public criarAcessToken( usuario: Usuario ): OAuthTokenResponseDTO {
    const jwtOptions = {
      // expiresIn: config.oauthJwt.ACCESS_TOKEN_EXPIRES_MILLI
    };

    const expiresIn: number = new Date().getTime() + config.oauthJwt.ACCESS_TOKEN_EXPIRES_MILLI;

    const tokenCripto: AccessTokenJwtCriptoDTO = {
      tipo : 'U',
      user_name : usuario.email,
      scope : ['read', 'write'],
      statusCadastro : 'C',
      trocarSenha : false,
      nome : usuario.name,
      id : usuario.id,
      authorities : this.getMockPermissoes(),
      jti : '',
      client_id : config.oauthJwt.CLIENT_ID,
      exp: expiresIn
    };

    const accessToken = jwt.sign(tokenCripto, config.oauthJwt.JWT_PW, jwtOptions);

    const tokenResponseDTO = new OAuthTokenResponseDTO();
    tokenResponseDTO.access_token = accessToken;
    tokenResponseDTO.token_type = 'bearer';
    tokenResponseDTO.scope = 'read write';
    tokenResponseDTO.tipo = 'U';
    tokenResponseDTO.statusCadastro = 'C';
    tokenResponseDTO.trocarSenha = false;
    tokenResponseDTO.nome = usuario.name;
    tokenResponseDTO.id = '' + usuario.id;
    tokenResponseDTO.jti = '';

    return tokenResponseDTO;
  }

  public criarRefreshToken(usuario: Usuario): string {
    const jwtOptions = {
      expiresIn: config.oauthJwt.REFRESH_TOKEN_EXPIRES_MILLI
    };
    usuario.password = '';
    const refreshToken = jwt.sign(usuario, config.oauthJwt.JWT_PW, jwtOptions);

    return refreshToken;
  }

  public injetarRefreshTokenNoCookie(refreshToken: string, res: Response): void {
    const options = {
      maxAge: config.oauthJwt.REFRESH_TOKEN_COOKIE_MAX_AGE_MILLI,
      httpOnly: true
    };
    res.cookie('refresh_token', refreshToken, options);
  }


  private getMockPermissoes(): string[] {

    return ["PEP_REALD_CONSULTA",
    "REL_AUDITORIA_PCA",
    "ADM_CONFIGURACAO_GLOBAL",
    "CLIENTE.NO_PSSOA_TEL_COM",
    "DIST_PROF_UNIDADE",
    "ATESTADO_EXTERNO",
    "PEP_AGEND_BLOQUEIO_SLOT",
    "REL_AUDITORIA_WS_CLIENTE",
    "CLIENTE.ID_CLENT_CONT",
    "FNC_VISUALIZAR_MEDICOS",
    "PERFIL.NM_PSSOA_EMAIL",
    "ADM_NIVEIS_RISCO_SAUDE",
    "DIST_RELATORIO_DISTRIBUICAO_CARTEIRA_SIMPLIFICADO",
    "FNC_QUESTAO_TIPO_QUERY",
    "CLIENTE.ID_PSSOA_TITLR",
    "ADM_AGENDAMENTO",
    "FNC_CAMPLEARNING_LINK",
    "ADM_VIZ_QUESTIONARIO",
    "FNC_REABRIR_PLANOACAO",
    "ADM_QUESTIONARIO",
    "CLIENTE.CD_PSSOA_EXTRN",
    "GTR_CLIENTES_PENDENTES",
    "PEP_TIPO_CONSULTA",
    "ADM_TERMOACEITE",
    "PEP_ALTA_PACIENTE",
    "PEP_CID",
    "PEP_SOAP",
    "DIST_UNIDADE",
    "FNC_EXIBIR_CAMPO_PRADM",
    "USUARIO.NM_PSSOA_SENHA",
    "USUARIO.NO_CEP",
    "ADM_AGEND_LOCAL",
    "FNC_REABRIR_ACAO",
    "PEP_RELATORIO_AGENDAMENTO",
    "USUARIO.NM_PSSOA_EMAIL",
    "ADM_QUESTOES",
    "CLIENTE.TP_PSSOA",
    "PEP_REL_ALTA_PACIENTE",
    "ADM_VIZ_QUESTAO",
    "PERFIL.NM_PSSOA_SENHA",
    "ABA_RISCOS",
    "REL_QUESTIONARIO",
    "PEP_RELATORIO_SUMARIZADO",
    "ABA_DISPOSITIVOS",
    "ADM_IMPORTACAO_DADO_CLINICO_EXCEL",
    "USUARIO.NO_PSSOA_TEL_CEL",
    "USUARIO.VL_CLENT_COMPL_MAX",
    "CLIENTE.ID_CLENT_TIPO",
    "CLIENTE.NM_PSSOA",
    "ADM_REL_DINAMICO_SUMARIZADO",
    "CLIENTE.CD_PSSOA_GSTOR",
    "USUARIO.NO_PSSOA_CPF",
    "FNC_SELECIONAR_GESTOR",
    "CLIENTE.CD_PSSOA_PRADM",
    "PERFIL.ID_PSSOA_SEXO",
    "ATE_SEC_CLIENTE",
    "ADM_PLANO_CUIDADO_CONTINUO",
    "FNC_INSERIR_QUEST_QTNRO_AVULSO",
    "USUARIO.DT_PSSOA_NASCI",
    "ADM_PARAM_SYS",
    "USUARIO.CD_ESTDO",
    "ADM_CAD_MEDICAMENTOS",
    "ADM_DICAS_SAUDE",
    "ANALYTICS_BTN",
    "CLIENTE.NM_PSSOA_LOGIN",
    "USUARIO.DS_ENDRC",
    "CLIENTE.NO_PSSOA_TEL_CEL",
    "PEP_EXCLUIR_CONSULTA",
    "PERFIL.DT_PSSOA_NASCI",
    "PEP_QUEIXA",
    "USUARIO.CD_ESPMD",
    "USUARIO.NO_PSSOA_TEL_RES",
    "CLIENTE.NM_PSSOA_EMAIL",
    "USUARIO.VL_CLENT_HABIT_MAX",
    "ADM_PERFIL_ACESSO",
    "ADM_CAMPANHA",
    "PERFIL.DS_ESPECIFICIDADE",
    "CLIENTE.CD_EMPSA_CLENT",
    "ADM_VIZ_ACOES",
    "ABA_ANEXOS",
    "PERFIL.NM_PSSOA",
    "MERGE_PACIENTE",
    "ADM_IMPORTACAO_PESSOA_EXCEL",
    "PRS_CLIENTES",
    "PEP_LOCAL_ATENDIMENTO",
    "ADM_REL_DINAMICO_DESCRITIVO",
    "USUARIO.CD_PRFAC",
    "PEP_MODELO_DOCUMENTO",
    "PEP_REL_QUESTIONARIO_AVULSO",
    "ADM_EMPRESAS",
    "CLIENTE.NO_PSSOA_CPF",
    "PEP_FERIADOS",
    "USUARIO.NO_PSSOA_TEL_COM",
    "ADD_REL_CUSTOMIZADO",
    "USUARIO.ID_PSSOA_SEXO",
    "CLIENTE.ID_PSSOA_SEXO",
    "FNC_HEALTHVISION_LINK",
    "ADM_TERMO_APLICATIVO_EXCLUSIVO",
    "CLIENTE.CD_PRTSC",
    "PERFIL.NO_PSSOA_CPF",
    "ADM_AGEND_LISTA_ESPER",
    "USUARIO.DS_BAIRRO",
    "PEP_LISTA_GUIAS_TISS",
    "CLIENTE.DS_LCALE",
    "DIST_ATRIBUICAO",
    "CLIENTE.NO_CEP",
    "CLIENTE.CD_PSSOA_TITLR",
    "FNC_VISUALIZAR_GESTORES",
    "ADM_AGEND_TEMA",
    "DIST_DISTRIBUICAO_AUTOMATICA",
    "FNC_EXCLUIR_BENEFICIARIO",
    "HISTORICO_PEP",
    "ADM_MENU_CONSULTA_PEP",
    "GTR_NOVO_CLIENTE",
    "PEP_AGENDAMENTO_MULTIPLO",
    "PEP_CIAP",
    "ALT_PERFIL_USUARIO",
    "PEP_RELATORIO_DESCRITIVO",
    "ABA_OBSERVACEOS",
    "PERFIL.NO_PSSOA_TEL_CEL",
    "ADM_AGEND_GRUPO_PARTI",
    "DIST_REGRA",
    "ABA_DEPENDENTES",
    "ADM_USUARIOS",
    "CLIENTE.DS_BAIRRO",
    "USUARIO.CD_EMPPS",
    "ABA_PROF_REF",
    "PEP_EXCLUIR_AGENDAMENTO",
    "ADM_RISCOS_SAUDE",
    "ADM_INTEGRACOES",
    "ABA_PEP",
    "ADM_AGEND_PCA",
    "MEDICAMENTOS_COLUNAS_VISUALIZACAO",
    "PEP_AGEND_CONSULTA",
    "ADM_AGEND_REALZ_SESSA",
    "PEP_RELATORIO_TELEFONE",
    "USUARIO.CD_CIDDE",
    "CLIENTE.DS_ENDRC",
    "GTR_CLIENTES",
    "ADM_PLANO_CUIDADO_AUTOMATICO",
    "USUARIO.DS_LCALE",
    "PERFIL.DS_LCALE",
    "USUARIO.NO_PSSOA_REG_CLASS",
    "USUARIO.ST_PSSOA",
    "ABA_CARTEIRINHA",
    "CLIENTE.NM_PSSOA_SENHA",
    "ADM_MINHA_AGENDA",
    "GRAFICOS_CRESCIMENTO",
    "ADM_ANEXO_PEP",
    "FNC_CADASTRAR_CONTRATANTE_MANUALMENTE",
    "USUARIO.DS_ESPECIFICIDADE",
    "ADM_AGEND_GRUPO_SESSA",
    "ADM_NIVEIS_PREMIACAO",
    "USUARIO.CD_PSSOA_EXTRN",
    "ADM_ACOES",
    "ADM_TIPO_DOCUMENTO",
    "ADM_DISTRIBUICAO_ACAO",
    "PEP_CONFIG_AGENDA_TODOS",
    "PERFIL.NO_PSSOA_TEL_COM",
    "PEP_APROV_REFERENCIA",
    "ABA_ACOMPANHAMENTO",
    "CLIENTE.DT_PSSOA_NASCI",
    "CLIENTE.ST_PSSOA",
    "PEP_FERIAS_AUSENCIA",
    "PEP_CONFIG_AGENDA",
    "ADM_CAD_EMAIL",
    "CLIENTE.NO_PSSOA_TEL_RES",
    "ADM_USUARIOS_MEMED",
    "REL_CUMPRIMENTO_PLANO_ACAO",
    "PEP_GUIA_SPSADT_SOLIC_EXAM",
    "CLIENTE.CD_CONVE",
    "ADM_AGEND_GRUPO",
    "ADM_CLIENTES",
    "CLIENTE.CD_ESTDO",
    "PEP_HISTORIO_ANEXO",
    "CLIENTE.CD_CIDDE",
    "ADM_GRAU_PARENTESCO",
    "REL_CUSTOMIZADO",
    "PEP_CONVENIO",
    "USUARIO.NM_PSSOA",
    "USUARIO.NM_PSSOA_LOGIN",
    "PERFIL.NO_PSSOA_TEL_RES",
    "ADM_COMBO_EXAME",
    "ADM_CAD_ESPECIALIDADES",
    "ADM_CONFIG_PCA",
    "EDT_DADOS_TDS_USRIOS_CLIENT_EMP",
    "PERFIL.NM_PSSOA_LOGIN",
    "ADM_EDICAO_CAMPOS"];
  }
}