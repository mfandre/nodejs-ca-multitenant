require('dotenv').config();

module.exports = {
  APP_NAME: 'Andre fucking APP',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  JWT_PW: process.env.JWT_PW || 'key_jwt',
  LOG: [{
    name:'file', 
    options: {
      filename:'./logs/app.log'
    }
  }, {
    name:'console', 
    options: {}
  }, {
    name:'fluentd', 
    options: {
      host: 'localhost',
      port: 24224,
      timeout: 3.0,
      requireAckResponse: true // Add this option to wait response from Fluentd certainly
    }
  }], //log transports available
  mongo: {
    MONGO_SERVER: process.env.MONGO_SERVER,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PW: process.env.MONGO_PW
  },
  tenant_config: {
    CLIENT: process.env.TENANT_CLIENT || 'pg',
    USER: process.env.TENANT_USER || 'postgres',
    PORT: process.env.TENANT_PORT || 5432,
    HOST: process.env.TENANT_HOST || 'common_tenant',
    DATABASE: process.env.TENANT_DATABASE || 'common_tenant',
    PASSWORD: process.env.TENANT_PASSWORD || 'postgres'
  }
}