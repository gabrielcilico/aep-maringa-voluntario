module.exports = {
  "type": "postgres",
  "host": process.env.DATABASE_HOST,
  "port": process.env.DATABASE_PORT,
  "username": process.env.DATABASE_USER,
  "password": process.env.DATABASE_PASS,
  "database": process.env.DATABASE_NAME,
  "ssl": {
    "ca": process.env.SSL_CERT 
  },
  "entities": [
     process.env.ENTITIES_PATH
  ],
  "migrations": [
    process.env.MIGRATIONS
  ],
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
}