const express = require("express");

const router = express.Router();

const {
  addTodo,
  updateTodo,
  getTask,
} = require("../controller/todoController");

const authenticateToken = require("../middleware/authMiddleware");

router.post("/add", authenticateToken, addTodo);
router.put("/update/:id", authenticateToken, updateTodo);
router.get("/getTask", authenticateToken, getTask);
module.exports = router;
