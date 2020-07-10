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
System.register("drivers/webserver/_server", ["express"], function (exports_7, context_7) {
    "use strict";
    var express_1, bodyParser, app, routes, config, tenantResolver, url, PORT, ENV;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (express_1_1) {
                express_1 = express_1_1;
            }
        ],
        execute: function () {
            bodyParser = require('body-parser');
            app = express_1.default();
            routes = require('./routes');
            config = require('../../config');
            tenantResolver = require('./middlewares/tenantResolver');
            url = require('url');
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());
            app.use(routes);
            app.use((err, req, res, next) => {
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
            });
            app.use(function (req, res) {
                res.status(404).json({
                    status: 'Page does not exist'
                });
            });
            PORT = config.PORT || 3000;
            ENV = config.NODE_ENV;
            console.log("EVN", ENV);
            app.listen(PORT, () => {
                console.log(`Listening on PORT: ${PORT}`);
            });
            module.exports = {
                express: express_1.default,
                bodyParser,
                app,
                routes,
                config,
                tenantResolver
            };
        }
    };
});
System.register("drivers/webserver/middlewares/tenant-resolver", [], function (exports_8, context_8) {
    "use strict";
    var getConnectionBySlug, getNamespace, TenantResolver;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
            getConnectionBySlug = require('../../../db/sql/connectionManager').getConnectionBySlug;
            getNamespace = require('continuation-local-storage').getNamespace;
            TenantResolver = class TenantResolver {
                resolver(req, res, next) {
                    const slug = req.headers.slug;
                    if (!slug) {
                        console.log("No tenant setted");
                        res.json({ message: `Please provide tenant's slug to connect.` });
                        return;
                    }
                    if (next) {
                        next();
                    }
                }
            };
            exports_8("TenantResolver", TenantResolver);
        }
    };
});
System.register("drivers/webserver/app", ["express", "cors", "app/core/utils/http-util", "drivers/webserver/middlewares/tenant-resolver"], function (exports_9, context_9) {
    "use strict";
    var express_2, cors_1, http_util_1, tenant_resolver_1, url, interceptor, App;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (express_2_1) {
                express_2 = express_2_1;
            },
            function (cors_1_1) {
                cors_1 = cors_1_1;
            },
            function (http_util_1_1) {
                http_util_1 = http_util_1_1;
            },
            function (tenant_resolver_1_1) {
                tenant_resolver_1 = tenant_resolver_1_1;
            }
        ],
        execute: function () {
            url = require('url');
            interceptor = require('express-interceptor');
            App = class App {
                constructor() {
                    this.myResponseInterceptor = interceptor(function (req, res, next) {
                        return {
                            isInterceptable: function () {
                                const pathsPermitidosSemTenant = ['/',
                                    '/farms/*',
                                    '/farmndvis/*',
                                    '/farmprecipitations/*',
                                    '/favicon.ico',
                                    '/favicon-16x16.png',
                                    '/favicon-32x32.png',
                                    '/swagger-ui.css',
                                    '/swagger-ui-bundle.js',
                                    '/swagger-ui-standalone-preset.js',
                                    '/swagger-ui-init.js',
                                    '/swagger.json'];
                                var path = url.parse(req.url).pathname;
                                console.log("req.path", req.url);
                                for (let i = 0; i < pathsPermitidosSemTenant.length; i++) {
                                    if (pathsPermitidosSemTenant[i].indexOf('*') >= 0) {
                                        if (path.includes(pathsPermitidosSemTenant[i].replace('*', '')) || path.includes(pathsPermitidosSemTenant[i].replace('/*', ''))) {
                                            return next();
                                        }
                                    }
                                    else if (pathsPermitidosSemTenant[i] === path) {
                                        return next();
                                    }
                                }
                                return true;
                            },
                            intercept: function (body, send) {
                                App.tenantResolver.resolver(req, res, next);
                                try {
                                    body = JSON.stringify(http_util_1.HttpUtil.paginarResponse(body, req));
                                }
                                catch (err) {
                                    res.send(err.toString());
                                }
                                send(body);
                            }
                        };
                    });
                    this.express = express_2.default();
                    this.middlewares();
                    this.routes();
                }
                middlewares() {
                    this.express.use(express_2.default.urlencoded({ extended: false }));
                    this.express.use(express_2.default.json());
                    this.express.use(cors_1.default());
                    this.express.use(this.myResponseInterceptor);
                    this.express.use((err, req, res, next) => {
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
                    });
                }
                routes() {
                    const loginRota = require('./routes/login/route');
                    loginRota.register(this.express);
                    const swaggerUi = require('swagger-ui-express');
                    const specs = require('./routes/swagger/swagger.js');
                    this.express.get('/swagger.json', function (req, res, next) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(specs);
                    });
                    this.express.use('/', swaggerUi.serve, swaggerUi.setup(specs));
                }
            };
            exports_9("App", App);
            App.version = '1.0.0.20200707';
            App.tenantResolver = new tenant_resolver_1.TenantResolver();
            exports_9("default", new App().express);
        }
    };
});
System.register("drivers/webserver/server", ["drivers/webserver/app"], function (exports_10, context_10) {
    "use strict";
    var app_1, config, PORT, ENV;
    var __moduleName = context_10 && context_10.id;
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
System.register("drivers/webserver/routes/autenticacao/v1/autenticacao-rota-old", [], function (exports_11, context_11) {
    "use strict";
    var usersDb, jwt, config, AutenticacaoRota;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [],
        execute: function () {
            usersDb = require('./../../../../../data-access/users-db');
            jwt = require('jsonwebtoken');
            config = require('../../../../../config');
            AutenticacaoRota = class AutenticacaoRota {
                constructor() {
                    console.log('constructor...');
                }
                inicializarRota() {
                    this.router.use('/v1/autenticacao', this.router);
                    this.router.get('/login', (req, res) => {
                        const { email, password } = req.body;
                        const slug = req.headers.slug;
                        console.log('testes autenticacao-rota... ' + slug);
                        usersDb.findUsersBy(slug, 'email', email).then((data) => {
                            if (data.length != 1 || password !== data[0].password) {
                                res.status(401).send();
                                return;
                            }
                            data[0].password = undefined;
                            const token = jwt.sign(data[0], config.JWT_PW);
                            res.status(200).send({ userData: data[0], token });
                        }).catch((error) => {
                            console.error(error);
                            res.status(500).send();
                        });
                    });
                    return this.router;
                }
            };
            exports_11("AutenticacaoRota", AutenticacaoRota);
        }
    };
});
//# sourceMappingURL=../../../compiled/*.js.map