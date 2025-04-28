const pool = require("../config/db");

const createTask = async (title, description, status, userId) => {
  const result = await pool.query(
    "INSERT INTO todo (user_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, title, description, status]
  );

  return result;
};

const getTaskByUser = async (userId) => {
  const result = await pool.query(
    `SELECT id,title,status,description from todo WHERE user_id = $1`,
    [userId]
  );
  return result;
};

const updateTask = async (title, description, status, todoId, userId) => {
  const result = await pool.query(
    "UPDATE todo SET title=$1, description=$2, status=$3 WHERE id=$4 AND user_id=$5 RETURNING *",
    [title, description, status, todoId, userId]
  );
  return result;
};

const deleteTask = async (taskId, userId) => {
  const result = await pool.query(
    "DELETE FROM todo WHERE id=$1 and user_id = $2 RETURNING * ",
    [taskId, userId]
  );
  return result;
};

module.exports = { createTask, getTaskByUser, updateTask, deleteTask };
