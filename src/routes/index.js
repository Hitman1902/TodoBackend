const express = require("express");

const router = express.Router();

const todoRoutes = require("./todoRoutes");
const authRoutes = require("./auth");

router.use("/todo", todoRoutes);
router.use("/auth", authRoutes);

module.exports = router;
