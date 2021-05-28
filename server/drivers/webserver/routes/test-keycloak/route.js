let testKeycloakRoutes = module.exports = {}

testKeycloakRoutes.register = (router) => {
    const keycloak = require('../../auth/keycloak-config').getKeycloak();
    const test_auth = require('./test_auth');

    /**
     * @swagger
     * /test_auth:
     *   get:
     *     tags:
     *       - Test Route with Keycloak Authorization
     *     security:
     *       - keycloak: []
     *     description: test route with keycloak auth
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *          description: if you are authorized
     *       403:
     *          description: if you are unauthorized
     */
    router.get("/test_auth",keycloak.protect(), test_auth.test_auth);
}
