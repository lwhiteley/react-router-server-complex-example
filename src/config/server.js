import logger from '../logger';

const config = {
    port: 3000,
    dbConnectionString: process.env.DATABASE_URL || 'mongodb://localhost:27017/rrs-db',
    logger: { 
        format: 'tiny',
        options: {
            stream: logger.stream, 
        },
    },
    rest: {
        protected: ['__v'],
    },
};

export default config;