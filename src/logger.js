import winston from 'winston';

winston.emitErrs = true;

const fileTransport = new winston.transports.File({
  level: 'info',
  filename: './all-logs.log',
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: false,
});

const consoleTransport = new winston.transports.Console({
  level: 'debug',
  handleExceptions: true,
  json: false,
  colorize: true,
});

const logger = new winston.Logger({
  transports: [fileTransport, consoleTransport],
  exitOnError: false,
});

logger.stream = {
  write(message) {
    logger.info(message.slice(0, -1));
  },
};

export default logger;
