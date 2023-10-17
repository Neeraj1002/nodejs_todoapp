import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import taskRoutes from "./routes/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";
dotenv.config({
  path: "./.env",
});

export const app = express();

const router = express.Router();

//USing middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    Credentials: true,
  })
);

//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRoutes);

//Routes
app.get("/", (req, res) => {
  res.send("In server");
});

//error middle Ware
app.use(errorMiddleware);
