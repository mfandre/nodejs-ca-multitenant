let connectionManager = require('./connectionManager')

connectionManager.connectAllDb().then((data) => {
  // console.log(connectionManager.connectionMap)
}).catch(error => {
    console.log("Can't connect to common tenant database")
    console.log(error);
});

module.exports = connectionManager;