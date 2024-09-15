import React from "react";

function TodoList({ todos, deleteTodo, toggleComplete, setEditingTodo }) {
  return (
    <ul className=" space-y-reverse ml-7 font-cursive">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex -mt-5 items-center justify-between p-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105 ${
            todo.completed ? " line-through" : ""
          }`}
        >
          <span
            onClick={() => toggleComplete(todo.id)}
            className={`cursor-pointer ${
              todo.completed ? "text-green-600" : "text-gray-800"
            }`}
          >
            {todo.text}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setEditingTodo(todo)}
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              Hapus
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
