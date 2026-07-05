import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.json({ message: "Hello world" });
});

app.use("/api/tasks", taskRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000.");
});