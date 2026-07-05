import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

const PRIORITY_COLORS = {
  IMMEDIATE: "var(--priority-immediate)",
  High: "var(--priority-high)",
  Medium: "var(--priority-medium)",
  Low: "var(--priority-low)",
};

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const dueDate = task.due
    ? new Date(task.due).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const isOverdue = task.due && new Date(task.due) < new Date() && task.status !== "Completed";
  const isCompleted = task.status === "Completed";

  return (
    <>
      <div className={`task-card ${isCompleted ? "completed" : ""}`}>
        <div className="task-card-header">
          <span
            className="priority-badge"
            style={{ backgroundColor: PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.Medium }}
          >
            {task.priority}
          </span>
          <span className={`status-badge ${isCompleted ? "status-done" : "status-pending"}`}>
            {task.status}
          </span>
        </div>

        <h3 className="task-title">{task.title}</h3>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        {dueDate && (
          <p className={`task-due ${isOverdue ? "overdue" : ""}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {isOverdue ? "Overdue: " : "Due: "}
            {dueDate}
          </p>
        )}

        <div className="task-card-actions">
          <button
            className={`btn ${isCompleted ? "btn-undo" : "btn-complete"}`}
            onClick={() => onToggleStatus(task._id, isCompleted ? "Pending" : "Completed")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isCompleted ? (
                <><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></>
              ) : (
                <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>
              )}
            </svg>
            {isCompleted ? "Undo" : "Complete"}
          </button>
          <button className="btn btn-edit" onClick={() => onEdit(task)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>
          <button className="btn btn-delete" onClick={() => setShowConfirm(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Delete
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        onConfirm={() => {
          setShowConfirm(false);
          onDelete(task._id);
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}

