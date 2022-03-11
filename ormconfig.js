require('dotenv').config()

module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST || '127.0.0.1',
    "port": parseInt(process.env.DB_PORT) || 5432,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "entities": ["dist/**/*.entity.js"],
    "migrations": ["dist/database/migrations/*.js"],
    "cli": {
        "migrationsDir": "src/database/migrations"
    },
    "synchronize": false
}