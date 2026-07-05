import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TaskPage() {
  const { tasks, loading, error, addTask, removeTask, editTask } = useTasks();
  const [editingTask, setEditingTask] = useState(null);

  async function handleSubmit(formData) {
    if (editingTask) {
      await editTask(editingTask._id, formData);
      setEditingTask(null);
    } else {
      await addTask(formData);
    }
  }

  function handleEdit(task) {
    setEditingTask(task);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  async function handleDelete(id) {
    await removeTask(id);
    // If we were editing this task, cancel edit
    if (editingTask && editingTask._id === id) {
      setEditingTask(null);
    }
  }

  return (
    <div className="task-page">
      <TaskForm
        onSubmit={handleSubmit}
        editingTask={editingTask}
        onCancelEdit={handleCancelEdit}
      />

      <div className="task-list-container">
        <div className="task-list-header">
          <h2>
            Your Tasks
            {!loading && (
              <span className="task-count">{tasks.length}</span>
            )}
          </h2>
        </div>

        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
