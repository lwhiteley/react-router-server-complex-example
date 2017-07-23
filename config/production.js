import pkg from '../package';

const config = {
  env: 'production',
  port: process.env.PORT || 80,
  dbConnectionString: process.env.DATABASE_URL ||
    `mongodb://localhost:27017/${pkg.name}-db`,
};

module.exports = config;
