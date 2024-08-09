import winston from 'winston';

const format = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.colorize({ all: true }),
  winston.format.simple(),
);

export const logger = winston.createLogger({
  level: 'debug',
  format: format,
  transports: [
    new winston.transports.Console({}),
  ],
});
