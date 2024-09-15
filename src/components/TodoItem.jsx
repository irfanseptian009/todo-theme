import React from "react";

function TodoItem({ todo, deleteTodo, updateTodo, toggleComplete, setEditingTodo }) {
  return (
    <li className="flex items-center">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>Hapus</button>
      <button onClick={() => setEditingTodo(todo)}>Edit</button>
    </li>
  );
}

export default TodoItem;
