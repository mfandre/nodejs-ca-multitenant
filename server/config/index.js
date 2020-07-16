require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,

  oauthJwt: {
    JWT_PW: process.env.JWT_PW || 'key_jwt',
    ACCESS_TOKEN_EXPIRES_MILLI: 10000,
    REFRESH_TOKEN_EXPIRES_MILLI: 30000,
    REFRESH_TOKEN_COOKIE_MAXAGE_MILLI: 2592000
  },

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