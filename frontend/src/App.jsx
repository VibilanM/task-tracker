import TaskPage from "./pages/TaskPage";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="app-main">
        <TaskPage />
      </main>
      <footer className="app-footer">
        <p>Task Tracker &copy; {new Date().getFullYear()}</p>
      </footer>
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
}

export default App;

