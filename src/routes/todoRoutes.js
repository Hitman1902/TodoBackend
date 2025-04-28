const express = require("express");

const router = express.Router();

const {
  addTodo,
  updateTodo,
  getTask,
  deleteTask,
} = require("../controller/todoController");

const authenticateToken = require("../middleware/authMiddleware");

const { todoSchema } = require("../validators/todo.validators");

const validateRequest = require("../middleware/validateRequest");

router.post("/add", authenticateToken, validateRequest(todoSchema), addTodo);
router.put("/:id", authenticateToken, validateRequest(todoSchema), updateTodo);
router.get("/getTask", authenticateToken, validateRequest(todoSchema), getTask);
router.delete(
  "/:id",
  authenticateToken,
  validateRequest(todoSchema),
  deleteTask
);
module.exports = router;
