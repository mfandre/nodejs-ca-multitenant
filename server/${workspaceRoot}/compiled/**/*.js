var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
console.log('empty ts');
System.register("app/core/default-model", [], function (exports_1, context_1) {
    "use strict";
    var DefaultModel;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DefaultModel = class DefaultModel {
            };
            exports_1("DefaultModel", DefaultModel);
        }
    };
});
System.register("app/core/utils/array-util", [], function (exports_2, context_2) {
    "use strict";
    var ArrayUtil;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            ArrayUtil = class ArrayUtil {
                removerDuplicadosENulos(arr) {
                    if (arr) {
                        for (let i = 0; i < arr.length; i++) {
                            if (!arr[i]) {
                                delete arr[i];
                            }
                        }
                        try {
                            return arr.filter((o, index) => {
                                const _o = JSON.stringify(o);
                                return index === arr.findIndex(obj => {
                                    return JSON.stringify(obj) === _o;
                                });
                            });
                        }
                        catch (e) {
                            return arr;
                        }
                    }
                }
            };
            exports_2("ArrayUtil", ArrayUtil);
        }
    };
});
System.register("app/core/utils/paginator/pagina.model", [], function (exports_3, context_3) {
    "use strict";
    var Pagina;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            Pagina = class Pagina {
                constructor() {
                    this.tamanhoPagina = Pagina.TAMANHO_PAGINA_DEFAULT;
                }
            };
            exports_3("Pagina", Pagina);
            Pagina.TAMANHO_PAGINA_DEFAULT = 10;
        }
    };
});
System.register("app/core/utils/http-util", ["app/core/utils/paginator/pagina.model"], function (exports_4, context_4) {
    "use strict";
    var pagina_model_1, HttpUtil;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (pagina_model_1_1) {
                pagina_model_1 = pagina_model_1_1;
            }
        ],
        execute: function () {
            HttpUtil = class HttpUtil {
                static paginarResponse(elementos, req) {
                    const pagina = new pagina_model_1.Pagina();
                    let paginaAtual;
                    try {
                        paginaAtual = req.query.pagina ? +req.query.pagina : 1;
                    }
                    catch (e) {
                        paginaAtual = 0;
                    }
                    const ultimoElemento = ((paginaAtual - 1) * pagina_model_1.Pagina.TAMANHO_PAGINA_DEFAULT) + 1;
                    pagina.totalElementos = elementos.length;
                    if (pagina.totalElementos === 1 && elementos[0] === null) {
                        pagina.totalElementos = 0;
                        pagina.conteudo = null;
                        pagina.paginaAtual = 0;
                    }
                    else {
                        pagina.quantidadePaginas = Math.ceil((pagina.totalElementos / pagina_model_1.Pagina.TAMANHO_PAGINA_DEFAULT));
                        const _elementos = elementos.slice(ultimoElemento - 1, (ultimoElemento - 1 + pagina_model_1.Pagina.TAMANHO_PAGINA_DEFAULT));
                        pagina.conteudo = _elementos;
                        pagina.paginaAtual = paginaAtual;
                    }
                    return pagina;
                }
            };
            exports_4("HttpUtil", HttpUtil);
        }
    };
});
System.register("app/seguranca/usuario/usuario.service", [], function (exports_5, context_5) {
    "use strict";
    var UsuarioService;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            UsuarioService = class UsuarioService {
            };
            exports_5("UsuarioService", UsuarioService);
        }
    };
});
System.register("app/seguranca/usuario/model/usuario.model", ["app/core/default-model"], function (exports_6, context_6) {
    "use strict";
    var default_model_1, Usuario;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (default_model_1_1) {
                default_model_1 = default_model_1_1;
            }
        ],
        execute: function () {
            Usuario = class Usuario extends default_model_1.DefaultModel {
            };
            exports_6("Usuario", Usuario);
        }
    };
});
System.register("drivers/webserver/middlewares/tenant-resolver-middleware", [], function (exports_7, context_7) {
    "use strict";
    var url, getConnectionBySlug, getNamespace, TenantResolverMiddleware;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            url = require('url');
            getConnectionBySlug = require('../../../db/sql/connectionManager').getConnectionBySlug;
            getNamespace = require('continuation-local-storage').getNamespace;
            TenantResolverMiddleware = class TenantResolverMiddleware {
                resolver(req, res, next) {
                    const pathsPermitidosSemTenant = ['/',
                        '/farms/*',
                        '/swagger',
                        '/swagger/',
                        '/farmndvis/*',
                        '/farmprecipitations/*',
                        '/swagger/favicon.ico',
                        '/swagger/favicon-16x16.png',
                        '/swagger/favicon-32x32.png',
                        '/swagger/swagger-ui.css',
                        '/swagger/swagger-ui-bundle.js',
                        '/swagger/swagger-ui-standalone-preset.js',
                        '/swagger/swagger-ui-init.js',
                        '/swagger/swagger.json'];
                    var path = url.parse(req.url).pathname;
                    console.log("req.path", path);
                    let tenantNecessario = true;
                    for (let i = 0; i < pathsPermitidosSemTenant.length; i++) {
                        if (pathsPermitidosSemTenant[i].indexOf('*') >= 0) {
                            if (path.includes(pathsPermitidosSemTenant[i].replace('*', '')) || path.includes(pathsPermitidosSemTenant[i].replace('/*', ''))) {
                                console.log('tenant-resolver: * routes');
                                tenantNecessario = false;
                                break;
                            }
                        }
                        else if (pathsPermitidosSemTenant[i] === path) {
                            tenantNecessario = false;
                            break;
                        }
                    }
                    if (tenantNecessario && !req.headers.slug) {
                        console.log("Nenhum tenant definido no header");
                        res.json({ message: `Por favor defina um tenant ( Http Headers ) para processar esta requisição.` });
                        return;
                    }
                    next();
                }
            };
            exports_7("TenantResolverMiddleware", TenantResolverMiddleware);
        }
    };
});
System.register("drivers/webserver/middlewares/paginacao-middleware", ["app/core/utils/http-util"], function (exports_8, context_8) {
    "use strict";
    var http_util_1, PaginacaoMiddleware;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (http_util_1_1) {
                http_util_1 = http_util_1_1;
            }
        ],
        execute: function () {
            PaginacaoMiddleware = class PaginacaoMiddleware {
                paginar(req, res, next) {
                    let body;
                    try {
                        body = JSON.stringify(http_util_1.HttpUtil.paginarResponse(body, req));
                    }
                    catch (err) {
                        res.send(err.toString());
                        return false;
                    }
                    res.send(body);
                    next();
                }
            };
            exports_8("PaginacaoMiddleware", PaginacaoMiddleware);
        }
    };
});
System.register("drivers/webserver/middlewares/error-handler-middleware", [], function (exports_9, context_9) {
    "use strict";
    var ErrorHandlerMiddleware;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [],
        execute: function () {
            ErrorHandlerMiddleware = class ErrorHandlerMiddleware {
                resolver(err, req, res, next) {
                    if (err) {
                        console.error(err.message);
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                        return res.status(err.statusCode).send({
                            statusCode: err.statusCode,
                            message: err.message
                        });
                    }
                    next();
                }
            };
            exports_9("ErrorHandlerMiddleware", ErrorHandlerMiddleware);
        }
    };
});
System.register("drivers/webserver/app", ["express", "cors", "drivers/webserver/middlewares/tenant-resolver-middleware", "drivers/webserver/middlewares/paginacao-middleware", "drivers/webserver/middlewares/error-handler-middleware"], function (exports_10, context_10) {
    "use strict";
    var express_1, cors_1, tenant_resolver_middleware_1, paginacao_middleware_1, error_handler_middleware_1, url, App;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (express_1_1) {
                express_1 = express_1_1;
            },
            function (cors_1_1) {
                cors_1 = cors_1_1;
            },
            function (tenant_resolver_middleware_1_1) {
                tenant_resolver_middleware_1 = tenant_resolver_middleware_1_1;
            },
            function (paginacao_middleware_1_1) {
                paginacao_middleware_1 = paginacao_middleware_1_1;
            },
            function (error_handler_middleware_1_1) {
                error_handler_middleware_1 = error_handler_middleware_1_1;
            }
        ],
        execute: function () {
            url = require('url');
            App = class App {
                constructor() {
                    this.tenantResolverMiddleware = new tenant_resolver_middleware_1.TenantResolverMiddleware();
                    this.paginacaoMiddleware = new paginacao_middleware_1.PaginacaoMiddleware();
                    this.errorHandlerMiddleware = new error_handler_middleware_1.ErrorHandlerMiddleware();
                    this.express = express_1.default();
                    this.middlewares();
                }
                middlewares() {
                    this.express.use(express_1.default.urlencoded({ extended: false }));
                    this.express.use(express_1.default.json());
                    this.express.use(cors_1.default());
                    this.express.use(this.tenantResolverMiddleware.resolver);
                    this.routes();
                    this.express.use(this.errorHandlerMiddleware.resolver);
                }
                routes() {
                    const loginRota = require('./routes/login/route');
                    loginRota.register(this.express);
                    const autenticacaoRota = require('./routes/autenticacao/v1/autenticacao-rota');
                    autenticacaoRota.register(this.express);
                    const swaggerUi = require('swagger-ui-express');
                    const specs = require('./routes/swagger/swagger.js');
                    this.express.get('/swagger.json', function (req, res, next) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(specs);
                    });
                    this.express.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
                    this.express.use(function (req, res, next) {
                        console.log('pagina nao encontrada.');
                        res.status(404).json({
                            status: 'Página inexistente.'
                        });
                    });
                }
            };
            exports_10("App", App);
            App.version = '1.0.0.20200707';
            exports_10("default", new App().express);
        }
    };
});
System.register("drivers/webserver/server", ["drivers/webserver/app"], function (exports_11, context_11) {
    "use strict";
    var app_1, config, PORT, ENV;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (app_1_1) {
                app_1 = app_1_1;
            }
        ],
        execute: function () {
            config = require('../../config');
            PORT = config.PORT || 3000;
            ENV = config.NODE_ENV;
            console.log("EVN", ENV);
            app_1.default.listen(PORT);
            console.log('healthmap_api_v4 is running on port ' + PORT);
        }
    };
});
System.register("drivers/webserver/routes/autenticacao/v1/autenticacao-rota-impl", [], function (exports_12, context_12) {
    "use strict";
    var AutenticacaoRotaImpl;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [],
        execute: function () {
            AutenticacaoRotaImpl = class AutenticacaoRotaImpl {
                constructor() {
                    this.testes = (req, res, next) => {
                        console.log('rotaImpl');
                        res.send('teste 2');
                    };
                    console.log('AutenticacaoRotaImpl constructor');
                }
                teste(req, res, next) {
                    console.log('rotaImpl');
                    res.send('teste 1');
                }
            };
            exports_12("AutenticacaoRotaImpl", AutenticacaoRotaImpl);
        }
    };
});
System.register("drivers/webserver/routes/autenticacao/v1/teste-rota", ["typescript-rest"], function (exports_13, context_13) {
    "use strict";
    var typescript_rest_1, TesteRota;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (typescript_rest_1_1) {
                typescript_rest_1 = typescript_rest_1_1;
            }
        ],
        execute: function () {
            TesteRota = class TesteRota {
                sayHello() {
                    return "Hello " + name;
                }
            };
            __decorate([
                typescript_rest_1.Path("/xablau"),
                typescript_rest_1.GET,
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", String)
            ], TesteRota.prototype, "sayHello", null);
            TesteRota = __decorate([
                typescript_rest_1.Path('/oi')
            ], TesteRota);
            exports_13("TesteRota", TesteRota);
        }
    };
});
//# sourceMappingURL=../../../compiled/*.js.map