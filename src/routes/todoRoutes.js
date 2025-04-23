const express = require("express");

const router = express.Router();

const {
  addTodo,
  updateTodo,
  getTask,
  deleteTask,
} = require("../controller/todoController");

const authenticateToken = require("../middleware/authMiddleware");

router.post("/add", authenticateToken, addTodo);
router.put("/update/:id", authenticateToken, updateTodo);
router.get("/getTask", authenticateToken, getTask);
router.delete("/deleteTask/:id", authenticateToken, deleteTask);
module.exports = router;
