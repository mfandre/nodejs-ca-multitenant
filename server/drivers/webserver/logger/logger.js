const { transport } = require('winston');
const winston = require('winston')
const fluentd = require('fluent-logger')
const config = require('../../../config/index')

let transports = []

let file_config_index = config.LOG.map(item => item.name).indexOf("file")
if(file_config_index >= 0){
    console.log("file transport setted")
    let file_options = {
        level: 'info',
        filename: config.LOG[file_config_index].options.filename,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    }
    transports.push(new winston.transports.File(file_options))
}
 
let console_config_index = config.LOG.map(item => item.name).indexOf("console")
if(console_config_index >= 0){
    console.log("console transport setted")
    let console_options = {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    }

    transports.push(new winston.transports.Console(console_options))
}
    
let fluentd_config_index = config.LOG.map(item => item.name).indexOf("fluentd")
if(fluentd_config_index >= 0){
    console.log("fluend transport setted")
    let fluentd_config = config.LOG[fluentd_config_index].options
    let fluentTransport = fluentd.support.winstonTransport()
    var fluent = new fluentTransport(config.APP_NAME, fluentd_config);

    transports.push(fluent)
}
    
const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: transports,
  exitOnError: false
})

module.exports = logger