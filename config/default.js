import logger from '../src/logger';

const config = {
  port: process.env.PORT || 3000,
  dbConnectionString: process.env.DATABASE_URL ||
    'mongodb://localhost:27017/rrs-db',
  morgan: {
    format: 'tiny',
    options: {
      stream: logger.stream,
    },
  },
};

module.exports = config;
