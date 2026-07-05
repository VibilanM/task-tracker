import Task from "../models/task.model.js";

async function addTask(req, res) {
    try {
        const { title, description, status, priority, due } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }


        const task = new Task({
            title,
            description,
            status,
            priority,
            due
        });

        await task.save();
        res.status(201).json({ message: "Task added successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getTasks(req, res) {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

async function updateTask(req, res) {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndUpdate(id, req.body, { 
            returnDocument: 'after', 
            runValidators: true 
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

async function deleteTask(req, res) {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getTaskById(req, res) {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export { addTask, getTasks, updateTask, deleteTask, getTaskById };