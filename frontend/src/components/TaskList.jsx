import TaskCard from "./TaskCard";

export default function TaskList({ tasks, loading, error, onEdit, onDelete, hasFilters }) {
  if (loading) {
    return (
      <div className="task-list-status">
        <div className="spinner" />
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-list-status error">
        <p>⚠ {error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-status empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
        </svg>
        <p>{hasFilters ? "No tasks match your search or filter criteria." : "No Tasks Yet. Start by creating one."}</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
