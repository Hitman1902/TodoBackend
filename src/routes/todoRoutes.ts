import express, { Router, Response } from "express";
import { addTodo, updateTodo, getTask } from "../controller/todoController";
import authenticateToken, {
  AuthenticatedRequest,
} from "../middleware/authMiddleware";
import { todoSchema } from "../validator/todo.validator";
import validateRequest from "../middleware/validateRequest";

const router: Router = express.Router();

router.post(
  "/",
  authenticateToken,
  validateRequest(todoSchema),
  (req: AuthenticatedRequest, res: Response) => {
    addTodo(req, res);
  }
);
router.put("/:id", authenticateToken, validateRequest(todoSchema), () => {
  updateTodo;
});
router.get("/", authenticateToken, () => {
  getTask;
});
export default router;
