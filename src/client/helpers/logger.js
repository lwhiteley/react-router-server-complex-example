module.exports = (logName = 'default', browser = { asObject: true }) => {
  const pino = require('pino')({ browser }).child({
    logName,
  });

  if (process && process.env && process.env.NODE_ENV === 'production') {
    return {
      info: () => {},
      debug: () => {},
      warn: () => {},
      trace: () => {},
      error: pino.error,
    };
  }

  return pino;
};
