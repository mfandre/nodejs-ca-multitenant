export function winstonSetup(): any {
  const { createLogger, format, transports } = require('winston');
  const logger = createLogger({
    // level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS'
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
      format.colorize()
    ),
    defaultMeta: { service: 'healthmapv4-api' },
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.simple()
        )
      })
    ]
  });

  const winston = require('winston');

  winston.add(logger);

  return logger;
}