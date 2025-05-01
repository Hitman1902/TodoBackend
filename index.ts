import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import sequelize from "./src/config/db";
import router from "./src/routes";

const app: Application = express();

app.use(
  cors({
    origin: "*", // or set your frontend URL for more security
    credentials: true,
  })
);

console.log(process.env.DB_USER);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const PORT = process.env.PORT || 8000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
  });
});
