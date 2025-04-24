const Todo = require("../models/todoModel");

const addTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const user_id = req.user.id;
    const todo = await Todo.create({ title, description, status, user_id });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to add todo" });
  }
};

const updateTodo = async (req, res) => {
  const { title, description, status } = req.body;
  const todoId = req.params.id;
  const user_id = req.user.id;
  try {
    const [updated] = await Todo.update(
      { title, description, status },
      { where: { id: todoId, user_id } }
    );
    if (!updated)
      return res.status(404).json({ error: "Todo not found or unauthorized" });
    const updatedTodo = await Todo.findByPk(todoId);
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

const getTask = async (req, res) => {
  const user_id = req.user.id;
  try {
    const tasks = await Todo.findAll({ where: { user_id } });
    const structuredTasks = {
      todo: [],
      in_progress: [],
      pending: [],
      complete: [],
    };
    tasks.forEach((task) => structuredTasks[task.status].push(task));
    res.json(structuredTasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

module.exports = { addTodo, updateTodo, getTask };
