import express, { Express } from "express";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

const app: Express = express();

app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
