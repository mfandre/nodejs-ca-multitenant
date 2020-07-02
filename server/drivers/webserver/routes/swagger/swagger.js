const swaggerJsdoc = require('swagger-jsdoc');
const config = require('../../../../config')

const options = {
  swaggerDefinition: {
    info: {
      swagger: "2.0",
      version: '1.0.0',
      description: 'Desenvolvido por - André de Mattos Ferraz',
      title: 'API'
    },
    host: 'localhost:' + config.PORT,
    basePath: '/',
    produces: [
        "application/json",
        "application/xml"
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
        JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: "The following syntax must be used in the 'Authorization' header : Bearer xxxxxx.yyyyyyy.zzzzzz",
        }
    }
  },
  apis: [__dirname + '/../**/*.js']
  //apis: ['./drivers/webserver/routes/**/*.js'] //Path to the API handle folder
  //apis: ['index.js']
};

let specs = module.exports = swaggerJsdoc(options);