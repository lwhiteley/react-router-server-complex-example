const config = {
    dbConnectionString: process.env.DATABASE_URL || 'mongodb://localhost:27017/rrs-db',
    logger: ':method :url :status :res[content-length] - :response-time ms',
};

export default config;