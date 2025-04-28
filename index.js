require("dotenv").config();

const express = require("express");

const cookieParser = require("cookie-parser");

const app = express();

const globalRoutes = require("./src/routes/index");

const cors = require("cors");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", globalRoutes);

app.listen(8000, () => {
  console.log("Server is listening on Port 8000");
});
