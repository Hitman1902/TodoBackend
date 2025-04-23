const pool = require("../config/db");

const addTodo = async (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.user.id;
  console.log("The userId is coming or not: ", userId);
  try {
    const result = await pool.query(
      "INSERT INTO todo (user_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, title, description, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add todo" });
  }
};

const updateTodo = async (req, res) => {
  const { title, description, status } = req.body;
  const todoId = req.params.id;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "UPDATE todo SET title=$1, description=$2, status=$3 WHERE id=$4 AND user_id=$5 RETURNING *",
      [title, description, status, todoId, userId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found or authorized" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "failed to updated the todo" });
  }
};

const getTask = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      `SELECT id,title,status,description from todo WHERE user_id = $1`,
      [userId]
    );
    const tasks = result.rows;
    console.log("The fetching Tasks: ", tasks);
    const structuredTasks = {
      todo: [],
      in_progress: [],
      pending: [],
      complete: [],
    };

    tasks.forEach((task) => {
      structuredTasks[task.status].push(task);
    });
    console.log("The structure tasks is: ", structuredTasks);
    res.json(structuredTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "DELETE FROM todo WHERE id=$1 and user_id = $2 RETURNING * ",
      [taskId, userId]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Task not Found " });
    }
    res.status(200).json({ message: "Task has been Deleted Successfully" });
  } catch (error) {
    console.log("Error message is ", error);
    res.status(500).json({ message: "Server error " });
  }
};

module.exports = { addTodo, updateTodo, getTask, deleteTask };
