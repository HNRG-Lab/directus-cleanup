const fs = require('fs');

module.exports = {
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: Number(process.env.DB_PORT),
        ssl: process.env.DB_SSL === 'true' || process.env.DB_SSL === '1' ? { ca: fs.readFileSync(process.env.DB_SSL_CA) } : false,
    }
};

