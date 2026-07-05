# Task Tracker

A full-stack task management application built with **React**, **Vite**, **Express**, and **MongoDB**.

---

## Features

### Core
- **Create** tasks with title, description, priority, and optional due date
- **Edit** tasks inline by populating the form and submitting updates
- **Delete** tasks with a confirmation popup
- **Mark Complete / Undo** — toggle task status between Pending and Completed
- Completed tasks automatically sink to the **bottom of the list**

### Search, Filter & Sort
- **Live Search** — filter tasks by title or description as you type
- **Status Filter** — toggle between All, Pending, and Completed
- **Sort** — order by Newest, Oldest, Highest Priority, or Due Date (soonest first)

### UX Polish
- **Toast Notifications** (react-toastify) for all CRUD operations
- **Form Validation** — required title, 300-char description limit, inline error messages
- **Loading Spinner** while fetching tasks
- **Empty State** — contextual messages when no tasks exist or none match filters
- **Responsive Design** — works on desktop, tablet, and mobile
- **Dark / Light Mode** — follows system preference
- **Overdue Detection** — highlights tasks past their due date

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Axios, react-toastify |
| Backend | Node.js, Express 5, Mongoose |
| Database | MongoDB Atlas |
| Styling | Vanilla CSS (custom properties, responsive grid) |

---

## Project Structure

```
task-tracker/
├── backend/
│   └── src/
│       ├── config/
│       │   └── db.js              # MongoDB connection
│       ├── controllers/
│       │   └── taskControllers.js  # CRUD logic
│       ├── models/
│       │   └── task.model.js       # Mongoose schema
│       ├── routes/
│       │   └── taskRoutes.js       # API routes
│       ├── server.js               # Express app entry
│       └── .env                    # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmModal.jsx    # Delete confirmation popup
│   │   │   ├── FilterBar.jsx       # Status filter + sort dropdown
│   │   │   ├── Navbar.jsx          # App header
│   │   │   ├── SearchBar.jsx       # Live search input
│   │   │   ├── TaskCard.jsx        # Individual task display
│   │   │   ├── TaskForm.jsx        # Add/Edit form with validation
│   │   │   └── TaskList.jsx        # Task grid with loading/empty states
│   │   ├── hooks/
│   │   │   └── useTasks.js         # Custom hook for task state management
│   │   ├── pages/
│   │   │   └── TaskPage.jsx        # Main page (search/filter/sort logic)
│   │   ├── services/
│   │   │   └── taskService.js      # Axios API layer
│   │   ├── App.jsx
│   │   ├── index.css               # Design system & responsive styles
│   │   └── main.jsx
│   ├── .env                        # VITE_API_URL
│   └── index.html
└── package.json
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks/:id` | Get a single task |
| `POST` | `/api/tasks/add` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/VibilanM/task-tracker.git
cd task-tracker
```

### 2. Backend Setup

```bash
# Install backend dependencies (from project root)
npm install
```

Create the environment file at `backend/src/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend server:

```bash
cd backend/src
node server.js
```

The API will be running at `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

The `.env` file is already configured:

```env
VITE_API_URL=http://localhost:5000/api/tasks
```

Start the development server:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/src/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | — |
| `PORT` | Server port | `5000` |

### Frontend (`frontend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api/tasks` |

---

## Task Model

| Field | Type | Required | Default |
|-------|------|----------|---------|
| `title` | String | ✅ | — |
| `description` | String | ❌ | — |
| `status` | Enum: `Pending`, `Completed` | ❌ | `Pending` |
| `priority` | Enum: `IMMEDIATE`, `High`, `Medium`, `Low` | ❌ | `Medium` |
| `due` | Date | ❌ | — |
| `createdAt` | Date | auto | — |
| `updatedAt` | Date | auto | — |

---

## License

This project is open source and available under the [MIT License](LICENSE).
