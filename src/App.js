import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import TasksList from "./components/TasksList";
import TaskForm from "./components/TaskForm";
import PokeApi from "./components/PokeApi";

function App() {
  return (
    <div className="bg-zinc-900 h-screen text-white">
      <div className="flex items-center justify-center h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TasksList />} />
            <Route path="/create-task" element={<TaskForm />} />
            <Route path="/edit-task/:id" element={<TaskForm />} />
            <Route path="/poke-api" element={<PokeApi />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;