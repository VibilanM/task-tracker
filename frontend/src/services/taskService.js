import axios from "axios";

let apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";
if (apiURL && !apiURL.endsWith("/api/tasks") && !apiURL.endsWith("/api/tasks/")) {
  apiURL = apiURL.replace(/\/$/, "") + "/api/tasks";
}

const API = axios.create({
  baseURL: apiURL,
});

export const getAllTasks = () => API.get("/");

export const createTask = (taskData) => API.post("/add", taskData);

export const updateTask = (id, taskData) => API.put(`/${id}`, taskData);

export const deleteTask = (id) => API.delete(`/${id}`);

export const getTaskById = (id) => API.get(`/${id}`);
