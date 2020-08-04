export function corsSetup(): any {
  const logger = require('winston');

  const whitelist = [
    'http://localhost:4200'
  ];

  logger.debug('cors-whitelist', whitelist);
  const config = require('./../config');

  const corsOptions = {
    credentials: true,
    origin(origin, callback): void {
      if ( config.NODE_ENV === 'development' ||  whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Não permitido pelo CORS'));
      }
    }
  };

  return corsOptions;
}