const config = {
    dbConnectionString: process.env.DATABASE_URL || 'mongodb://localhost:27017/rrs-db',
};

export default config;