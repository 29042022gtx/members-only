const { Pool } = require('pg');

const pool = new Pool({
  connectionSring: process.env.DB_URI,
});

module.exports = pool;
