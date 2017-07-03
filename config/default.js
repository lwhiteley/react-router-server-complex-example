import logger from '../src/logger';
import pkg from '../package';

const config = {
  host: 'localhost',
  protocol: process.env.PROTOCOL|| 'http',
  port: process.env.PORT || 3000,
  dbConnectionString: process.env.DATABASE_URL ||
    `mongodb://localhost:27017/${pkg.name}-db`,
  morgan: {
    format: 'tiny',
    options: {
      stream: logger.stream,
    },
  },
  mailer: {
    adminEmail: process.env.ADMIN_EMAIL,
    options: {
      host: process.env.MAILER_HOST,
      port: 465,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    }
  },
};

module.exports = config;
