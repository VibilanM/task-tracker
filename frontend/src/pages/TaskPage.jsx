import { useState, useMemo } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import { toast } from "react-toastify";

const PRIORITY_ORDER = {
  IMMEDIATE: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

export default function TaskPage() {
  const { tasks, loading, error, addTask, removeTask, editTask } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  
  // Search, Filter, and Sort states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  async function handleSubmit(formData) {
    try {
      if (editingTask) {
        await editTask(editingTask._id, formData);
        setEditingTask(null);
        toast.success("Task updated successfully!");
      } else {
        await addTask(formData);
        toast.success("Task added successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed.");
    }
  }

  function handleEdit(task) {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  async function handleDelete(id) {
    try {
      await removeTask(id);
      toast.info("Task deleted successfully!");
      if (editingTask && editingTask._id === id) {
        setEditingTask(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete task.");
    }
  }

  // Filter and Sort implementation
  const processedTasks = useMemo(() => {
    let result = [...tasks];

    // 1. Status Filter
    if (statusFilter !== "All") {
      result = result.filter((task) => task.status === statusFilter);
    }

    // 2. Search query live filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title?.toLowerCase().includes(q) ||
          task.description?.toLowerCase().includes(q)
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === "Newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === "Oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === "Priority") {
        const priorityA = PRIORITY_ORDER[a.priority] || 0;
        const priorityB = PRIORITY_ORDER[b.priority] || 0;
        if (priorityB !== priorityA) {
          return priorityB - priorityA;
        }
        // tie breaker: newest first
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === "DueDate") {
        if (!a.due && !b.due) return new Date(b.createdAt) - new Date(a.createdAt);
        if (!a.due) return 1; // puts items without due dates at the end
        if (!b.due) return -1;
        return new Date(a.due) - new Date(b.due);
      }
      return 0;
    });

    return result;
  }, [tasks, searchQuery, statusFilter, sortBy]);

  const hasFilters = searchQuery.trim() !== "" || statusFilter !== "All";

  return (
    <div className="task-page">
      <TaskForm
        onSubmit={handleSubmit}
        editingTask={editingTask}
        onCancelEdit={handleCancelEdit}
      />

      <div className="task-list-container">
        <div className="task-controls-wrapper">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar
            filter={statusFilter}
            onFilterChange={setStatusFilter}
            sort={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        <div className="task-list-header">
          <h2>
            Your Tasks
            {!loading && (
              <span className="task-count">{processedTasks.length}</span>
            )}
          </h2>
        </div>

        <TaskList
          tasks={processedTasks}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          hasFilters={hasFilters}
        />
      </div>
    </div>
  );
}
