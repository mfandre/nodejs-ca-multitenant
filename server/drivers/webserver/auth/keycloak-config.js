var session = require('express-session');
var Keycloak = require('keycloak-connect');
var config = require('../../../config/index')

let _keycloak;

function initKeycloak(app) {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        app.use(session({
            secret: 'appandresupersecretmegazord',
            resave: false,
            saveUninitialized: true,
            store: memoryStore
        }));

        _keycloak = new Keycloak({ store: memoryStore }, config.KEYCLOAK_CONFIG);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};