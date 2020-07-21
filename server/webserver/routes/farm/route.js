let farmRoutes = module.exports = {}

farmRoutes.register = (router) => {
    const farms = require('./farms');
    const farmNdvis = require('./farm-ndvis');
    const farmPrecipitations = require('./farm-precipitations');
    const login = require('../login/login');

    /**************************************
     * 
     * FARMS
     * 
     **************************************/

    /**
     * @swagger
     * /farms:
     *   get:
     *     tags:
     *       - farms
     *     security:
     *       - JWT: []
     *     description: Returns all farms
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of farms
     *         schema:
     *           $ref: '#/definitions/farm'
     */
    router.get('/farms', login.checkToken, farms.index);

    /**
     * @swagger
     * /farms/{id}:
     *   get:
     *     tags:
     *       - farms
     *     security:
     *       - JWT: []
     *     description: Returns a single farm
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: farm id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: A single farms
     *         schema:
     *           $ref: '#/definitions/farm'
     */
    router.get('/farms/:id', login.checkToken, farms.show);

    /**
     * @swagger
     * /farms:
     *   post:
     *     tags:
     *       - farms
     *     security:
     *       - JWT: []
     *     description: Creates a new farm
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: farm
     *         description: farm object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/farm'
     *     responses:
     *       200:
     *         description: Successfully created
     */
    router.post('/farms', login.checkToken, farms.create);

    /**
     * @swagger
     * /farms/{id}:
     *   delete:
     *     tags:
     *       - farms
     *     security:
     *       - JWT: []
     *     description: Delete a single farm
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: farm id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Single farm deleted
     *         schema:
     *           $ref: '#/definitions/farm'
     */
    router.delete('/farms/:id', login.checkToken, farms.delete);


    /**************************************
     * 
     * FARM NDVIS
     * 
     **************************************/

    /**
     * @swagger
     * /farmndvis:
     *   get:
     *     tags:
     *       - farmndvis
     *     security:
     *       - JWT: []
     *     description: Returns all farmndvis
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of farmndvis
     *         schema:
     *           $ref: '#/definitions/farmndvi'
     */
    router.get('/farmndvis', login.checkToken, farmNdvis.index);

    /**
     * @swagger
     * /farmndvis/{id}:
     *   get:
     *     tags:
     *       - farmndvis
     *     security:
     *       - JWT: []
     *     description: Returns a single farmndvi
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: farmndvi id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: A single farmndvi
     *         schema:
     *           $ref: '#/definitions/farmndvi'
     */
    router.get('/farmndvis/:id', login.checkToken, farmNdvis.show);

    /**
     * @swagger
     * /farmndvis:
     *   post:
     *     tags:
     *       - farmndvis
     *     security:
     *       - JWT: []
     *     description: Creates a new farmndvi
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: farmndvi
     *         description: farmndvi object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/farmndvi'
     *     responses:
     *       200:
     *         description: Successfully created
     */
    router.post('/farmndvis', login.checkToken, farmNdvis.create);

    /**
     * @swagger
     * /farmndvis/{id}:
     *   delete:
     *     tags:
     *       - farmndvis
     *     security:
     *       - JWT: []
     *     description: Delete a single farmndvi
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: farmndvi id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Single farmndvi deleted
     *         schema:
     *           $ref: '#/definitions/farmndvi'
     */
    router.delete('/farmndvis/:id', login.checkToken, farmNdvis.delete);



    /**************************************
     * 
     * FARM PRECIPITATION
     * 
     **************************************/

    /**
     * @swagger
     * /farmprecipitations:
     *   get:
     *     tags:
     *       - farmprecipitations
     *     security:
     *       - JWT: []
     *     description: Returns all farmprecipitations
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of farm precipitations
     *         schema:
     *           $ref: '#/definitions/farmprecipitation'
     */
    router.get('/farmprecipitations', login.checkToken, farmPrecipitations.index);

    /**
     * @swagger
     * /farmprecipitations/{id}:
     *   get:
     *     tags:
     *       - farmprecipitations
     *     security:
     *       - JWT: []
     *     description: Returns a single farm precipitation
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: farm precipitation id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: A single farm precipitation
     *         schema:
     *           $ref: '#/definitions/farmprecipitation'
     */
    router.get('/farmprecipitations/:id', login.checkToken, farmPrecipitations.show);

    /**
     * @swagger
     * /farmprecipitations:
     *   post:
     *     tags:
     *       - farmprecipitations
     *     security:
     *       - JWT: []
     *     description: Creates a new farm precipitation
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: farmprecipitation
     *         description: farmprecipitation object
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/farmprecipitation'
     *     responses:
     *       200:
     *         description: Successfully created
     */
    router.post('/farmprecipitations', login.checkToken, farmPrecipitations.create);

    /**
     * @swagger
     * /farmprecipitations/{id}:
     *   delete:
     *     tags:
     *       - farmprecipitations
     *     security:
     *       - JWT: []
     *     description: Delete a single farmprecipitation
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: farmprecipitation id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Single farmprecipitation deleted
     *         schema:
     *           $ref: '#/definitions/farmprecipitation'
     */
    router.delete('/farmprecipitations/:id', login.checkToken, farmPrecipitations.delete);

}