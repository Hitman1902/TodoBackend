const pool = require("../config/db");

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS todo(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('complete', 'in_progress', 'pending', 'todo')) DEFAULT 'todo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)
`;

pool
  .query(createTableQuery)
  .then(() => {
    console.log("User table created Successfully ");
    console.log("Todo table created Successfully ");
    pool.end();
  })
  .catch((err) => {
    console.log("Error while creating table users :", err);
    pool.end();
  });
