import { useState, useEffect, useCallback } from "react";
import * as taskService from "../services/taskService";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await taskService.getAllTasks();
      if (Array.isArray(data)) {
        setTasks(data);
      } else if (data && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        console.error("Expected array of tasks, but received:", data);
        setError("Invalid data format received from server");
        setTasks([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    const { data } = await taskService.createTask(taskData);
    if (data.task) {
      setTasks((prev) => [data.task, ...prev]);
    } else {
      await fetchTasks();
    }
    return data;
  };

  const removeTask = async (id) => {
    // Optimistic removal
    setTasks((prev) => prev.filter((t) => t._id !== id));
    try {
      await taskService.deleteTask(id);
    } catch (err) {
      // Rollback on failure
      await fetchTasks();
      throw err;
    }
  };

  const editTask = async (id, taskData) => {
    const { data: updated } = await taskService.updateTask(id, taskData);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    return updated;
  };

  return { tasks, loading, error, addTask, removeTask, editTask, fetchTasks };
}
