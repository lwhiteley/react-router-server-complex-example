import pkg from '../package';

const config = {
  port: process.env.PORT || 3000,
  dbConnectionString: process.env.DATABASE_URL ||
    `mongodb://localhost:27017/${pkg.name}-db`,
};

module.exports = config;