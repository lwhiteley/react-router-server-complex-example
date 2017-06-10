import logger from '../logger';
import common from './common';

const config = {
  port: process.env.PORT || 3000,
  dbConnectionString: process.env.DATABASE_URL ||
    'mongodb://localhost:27017/rrs-db',
  logger: {
    format: 'tiny',
    options: {
      stream: logger.stream,
    },
  },
};

export default Object.assign({}, common, config);
