const { Pool } = require("pg");
const { database } = require("pg/lib/defaults");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydb",
  password: "root",
  port: 5432,
});

module.exports = pool;
