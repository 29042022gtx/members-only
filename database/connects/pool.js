const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DB_URI,
});
pool.connect();

module.exports = pool;
