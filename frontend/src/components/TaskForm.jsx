import { useState, useEffect } from "react";

const PRIORITY_OPTIONS = ["IMMEDIATE", "High", "Medium", "Low"];
const MAX_DESCRIPTION_LENGTH = 300;

const emptyForm = {
  title: "",
  description: "",
  priority: "Medium",
  due: "",
};

export default function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        description: editingTask.description || "",
        priority: editingTask.priority || "Medium",
        due: editingTask.due ? editingTask.due.slice(0, 10) : "",
      });
      setErrors({});
    } else {
      setForm(emptyForm);
      setErrors({});
    }
  }, [editingTask]);

  function validate() {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (form.description.length > MAX_DESCRIPTION_LENGTH) {
      newErrors.description = `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`;
    }

    if (!form.priority) {
      newErrors.priority = "Priority is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = { ...form };
      if (!payload.due) delete payload.due;
      await onSubmit(payload);
      if (!editingTask) {
        setForm(emptyForm);
      }
      setErrors({});
    } catch (err) {
      setErrors({ form: err.response?.data?.message || "Something went wrong" });
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const descRemaining = MAX_DESCRIPTION_LENGTH - form.description.length;

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      {errors.form && <p className="error-banner">{errors.form}</p>}

      <div className="form-group">
        <label htmlFor="title">
          Title <span className="required">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="What needs to be done?"
          value={form.title}
          onChange={handleChange}
          className={errors.title ? "input-error" : ""}
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Add some details..."
          rows={3}
          value={form.description}
          onChange={handleChange}
          className={errors.description ? "input-error" : ""}
        />
        <span className={`char-count ${descRemaining < 0 ? "over" : ""}`}>
          {descRemaining} characters remaining
        </span>
        {errors.description && (
          <span className="field-error">{errors.description}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">
            Priority <span className="required">*</span>
          </label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className={errors.priority ? "input-error" : ""}
          >
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.priority && (
            <span className="field-error">{errors.priority}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="due">Due Date</label>
          <input
            id="due"
            name="due"
            type="date"
            value={form.due}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting
            ? "Saving..."
            : editingTask
            ? "Update Task"
            : "Add Task"}
        </button>
        {editingTask && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
