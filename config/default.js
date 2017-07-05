import boolean from 'boolean';
import logger from '../src/logger';
import pkg from '../package';

const config = {
  name: 'RRS',
  env: 'development',
  host: process.env.HOST || 'localhost',
  protocol: process.env.PROTOCOL || 'http',
  port: process.env.PORT || 3000,
  dbConnectionString: process.env.DATABASE_URL ||
    `mongodb://localhost:27017/${pkg.name}-db`,
  morgan: {
    format: 'tiny',
    options: {
      stream: logger.stream,
    },
  },
  authentication: {
    secret: process.env.APP_SECRET || 'supersecret',
  },
  adminEmail: process.env.ADMIN_EMAIL,
  mailer: {
    options: {
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT || 587,
      // secure:true for port 465, secure:false (default) for port 587
      secure: boolean(process.env.MAILER_SECURE), 
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    },
  },
  swagger: {
    docsPath: '/docs',
    info: {
      title: 'A test',
      description: 'A description',
    },
  },
};

module.exports = config;
