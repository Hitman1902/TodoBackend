import { Request, RequestHandler, Response } from "express";
import { Todo } from "../models/todoModel";
import { JwtPayload } from "../types/jwt";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const addTodo = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    console.log("🟡 Incoming request to addTodo");

    if (!req.user) {
      console.warn("🔴 Unauthorized request - no user found");
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    console.log("🟢 Authenticated user:", req.user);

    const { title, description, status } = req.body;
    console.log("📦 Request body:", { title, description, status });

    if (!title || !description) {
      console.warn("🟠 Missing title or description");
      res.status(400).json({ error: "Title and description are required." });
      return;
    }

    const user_id = Number(req.user.id);
    console.log("👤 Creating todo for user_id:", user_id);

    const todo = await Todo.create({ title, description, status, user_id });

    console.log("✅ Todo created:", todo);

    res.status(201).json(todo);
  } catch (err) {
    console.error("❌ Error in addTodo:", err);
    res.status(500).json({ error: "Failed to add todo" });
  }
};

export const updateTodo = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const { title, description, status } = req.body;
  const todoId = req.params.id;
  const user_id = req.user.id;

  try {
    const [updated] = await Todo.update(
      { title, description, status },
      { where: { id: todoId, user_id } }
    );

    if (!updated) {
      res.status(404).json({ error: "Todo not found or unauthorized" });
      return;
    }

    const updatedTodo = await Todo.findByPk(todoId);
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

export const getTask = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const user_id = String(req.user.id);
  try {
    const tasks = await Todo.findAll({ where: { user_id } });

    const structuredTasks = {
      todo: [] as typeof tasks,
      in_progress: [] as typeof tasks,
      pending: [] as typeof tasks,
      complete: [] as typeof tasks,
    };

    tasks.forEach((task) => {
      structuredTasks[task.status as keyof typeof structuredTasks].push(task);
    });

    res.json(structuredTasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};
