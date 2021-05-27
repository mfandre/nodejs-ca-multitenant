let boomRoutes = module.exports = {}

boomRoutes.register = (router) => {
    const boom = require('./boom');

    /**
     * @swagger
     * /boom:
     *   get:
     *     tags:
     *       - boom
     *     description: test a boom! (Exception)
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *          description: if success... but for test it always throws 500
     *       500:
     *          description: boom error
     */
    router.get("/boom", boom.boom);
}
