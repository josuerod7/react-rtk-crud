import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { fetchData, deleteTask } from "../features/tasks/taskSlice";

function TasksList() {
  const tasks = useSelector((state) => state.tasks.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData()); // Cuando el componente se monta, llamamos a fetchData para cargar los datos desde el servidor
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="w-4/6">
        <header className="flex justify-between items-center py-4">
            <h1 className="text-3xl">Tasks ({tasks.length})</h1>
            <Link
                to="/create-task"
                className="bg-indigo-600 px-2 py-1 rounded-sm text-sm shadow-sm"
            >
                Create Task
            </Link>      
        </header>

      <div className="grid grid-cols-3 gap-3">
        {tasks.map((task) => (
          <div className="bg-neutral-800 p-4 rounded-md" key={task.id}>
            <header className="flex justify-between">
              <h3 className="text-lg font-bold">{task.title}</h3>
              <div className="flex gap-x-2">
                <Link
                  to={`/edit-task/${task.id}`}
                  className="bg-zinc-600 px-2 py-1 text-xs rounded-md self-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 px-2 py-1 text-xs rounded-md"
                >
                  delete
                </button>
              </div>
            </header>
            <p className="textArea">{task.description}</p>
            <p className="text-xs text-slate-400">{task.id}</p>
          </div>
        ))}
      </div> 
    </div>
  );
}

export default TasksList;