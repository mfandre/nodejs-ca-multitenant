let loginRoutes = module.exports = {}

loginRoutes.register = (router) => {
    const login = require('./login');
    /**
     * 
     * JWT Authorization
     * 
     */

    /**
     * @swagger
     * /login:
     *   post:
     *     tags:
     *       - login
     *     description: login a user
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: header
     *         name: slug
     *         description: Tenant
     *         required: true
     *       - in: body
     *         name: user
     *         description: User credential
     *         schema:
     *           type: object
     *           required:
     *             - email
     *             - password
     *           properties:
     *             email:
     *               type: string
     *             password:
     *               type: string
     *     responses:
     *       200:
     *         description: JWT Token
     */
    router.post("/login", login.login);

    /**
     * @swagger
     * /auth:
     *   get:
     *     tags:
     *       - login
     *     security:
     *       - JWT: []
     *     description: Auth user
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: header
     *         name: slug
     *         description: Tenant
     *         required: true
     *     responses:
     *       200:
     *         description: Ok if token is ok
     */
    router.get("/auth", login.auth);

        /**
     * @swagger
     * /register:
     *   post:
     *     tags:
     *       - login
     *     description: Creates a new user
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: header
     *         name: slug
     *         description: Tenant
     *         required: true
     *       - in: body
     *         name: user
     *         description: User credential
     *         schema:
     *           type: object
     *           required:
     *             - email
     *             - password
     *             - name
     *           properties:
     *             email:
     *               type: string
     *             password:
     *               type: string
     *             name:
     *               type: string
     *     responses:
     *       200:
     *         description: User created
     */
    router.post("/register", login.register);
}
