const express = require('express')
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger/swagger.js');
const config = require('../../../config/index')
const router = express.Router()


const farmRoutes = require('./farm/route')
const loginRoutes = require('./login/route')
const boomRoutes = require('./boom/route')
const testKeycloakRoutes = require('./test-keycloak/route')

/**
 * @swagger
 * definitions:
 *   farm:
 *     properties:
 *       farm_id:
 *         type: integer
 *       name:
 *         type: string
 *       latitude:
 *         type: number
 *       longitude:
 *         type: number
 *       culture:
 *         type: string
 *       variety:
 *         type: string
 *       total_area:
 *         type: number
 *       yield_estimation:
 *         type: number
 *       price:
 *         type: number
 *   farmndvi:
 *     properties:
 *       ndvi:
 *         type: number
 *       date:
 *         type: string
 *       farm_id:
 *         type: integer
 *       farm_ndvi_id:
 *         type: integer
 *   farmprecipitation:
 *     properties:
 *       precipitation:
 *         type: number
 *       date:
 *         type: string
 *       farm_id:
 *         type: integer
 *       farm_precipitation_id:
 *         type: integer
 */


loginRoutes.register(router);
farmRoutes.register(router);
boomRoutes.register(router);
testKeycloakRoutes.register(router);
/**
 * 
 * Adding Swagger
 * 
 */
router.get('/swagger.json', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

var options = {
	validatorUrl : null,
	oauth: {
	 clientId: config.KEYCLOAK_CONFIG.clientId,
	 clientSecret: config.KEYCLOAK_CONFIG.credentials.secret,
	 realm:  config.KEYCLOAK_CONFIG.realm,
	 appName:  config.KEYCLOAK_CONFIG.clientId,
	 scopeSeparator: ",",
	 additionalQueryStringParams: {}
  }
};

router.use('/', swaggerUi.serve, swaggerUi.setup(specs, false, options));

module.exports = router