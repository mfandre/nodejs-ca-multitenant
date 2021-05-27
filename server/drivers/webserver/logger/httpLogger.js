const morgan = require('morgan')
const json = require('morgan-json')
const format = json({
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time'
})

const logger = require('./logger')
const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const {
        method,
        url,
        status,
        contentLength,
        responseTime
      } = JSON.parse(message)

      let status_number = Number(status);
      log_level = logger.info;
      
      if(status_number == 500){
        log_level = logger.error;
      }

      log_level('HTTP Access Log', {
        timestamp: new Date().toString(),
        method,
        url,
        status: Number(status),
        contentLength,
        responseTime: Number(responseTime)
      })
    }
  }
})

module.exports = httpLogger