export default function FilterBar({ filter, onFilterChange, sort, onSortChange }) {
  const filters = ["All", "Pending", "Completed"];

  return (
    <div className="filter-bar">
      <div className="filter-buttons">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => onFilterChange(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="sort-selector">
        <label htmlFor="sort-dropdown">Sort by:</label>
        <select
          id="sort-dropdown"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
          <option value="Priority">Highest Priority</option>
          <option value="DueDate">Due Date (Soonest)</option>
        </select>
      </div>
    </div>
  );
}
