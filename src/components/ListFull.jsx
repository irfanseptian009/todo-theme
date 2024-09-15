import React from "react";
import { SlWrench } from "react-icons/sl";
import { GoTrash } from "react-icons/go";
import { MdDone } from "react-icons/md"; // Tambahkan ikon ceklis

function ListFull({ todos, deleteTodo, toggleComplete, setEditingTodo }) {
  return (
    <div className="relative mt-4 rounded-md w-full">
      {/* ... (Latar belakang luar angkasa) */}

      <ul className="space-y-reverse font-mono text-white w-auto">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center mt-2 justify-between p-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md text-sm ${
              todo.completed ? "opacity-50" : ""
            }`}
            style={{
              backgroundColor:
                todo.priority === "Prioritas"
                  ? "rgba(255, 0, 0, 0.6)"
                  : todo.priority === "Perlu"
                  ? " rgba(0, 0, 255, 0.365)"
                  : "rgba(255, 255, 0, 0.6)",
            }}
          >
            <div className="flex items-center">
              {todo.completed && <MdDone className="text-green-400 mr-2" size={18} />}

              <span className="text-xs mr-2 uppercase">({todo.priority})</span>
              <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingTodo(todo)}
                className="px-2 py-1 text-xs rounded bg-gradient-to-r from-blue-900 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md border-2 border-blue-800"
              >
                <SlWrench />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-2 py-1 text-xs rounded bg-gradient-to-r from-red-900 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-md border-2 border-red-800"
              >
                <GoTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListFull;
