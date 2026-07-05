import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>☑ Task Flow</h1>
        <p className="app-subtitle">Stay organized, focused, and productive.</p>
      </header>
      <main className="app-main">
        <TaskPage />
      </main>
      <footer className="app-footer">
        <p>Task Flow App &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;

