const pool = require("../config/db");

const createUser = async (name, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password]
  );
  return result;
};

const findByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result;
};

const storeOTP = async (email, otp) => {
  const result = await pool.query(
    "UPDATE users SET otp = $1 WHERE email = $2 RETURNING *",
    [otp, email]
  );

  return result.rows[0];
};

const updatePassword = async (email, password) => {
  const result = await pool.query(
    "UPDATE users SET password = $1, otp = NULL WHERE email = $2 RETURNING *",
    [password, email]
  );
  return result.rows[0];
};

module.exports = { createUser, findByEmail, storeOTP, updatePassword };
