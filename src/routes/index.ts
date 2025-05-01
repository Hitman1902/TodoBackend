import express, { Router } from "express";

const router: Router = express.Router();

import todoRoutes from "./todoRoutes";
import authRoutes from "./auth";

router.use("/todo", todoRoutes);
router.use("/auth", authRoutes);

export default router;
