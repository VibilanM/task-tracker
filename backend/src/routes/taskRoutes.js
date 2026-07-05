import { addTask, getTasks, updateTask, deleteTask, getTaskById } from "../controllers/taskControllers.js";
import express from "express";

const router = express.Router();

router.post("/add", addTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;