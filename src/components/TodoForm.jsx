import React, { useState } from "react";
import Swal from "sweetalert2";

const TodoForm = ({ addTodo, todo, updateTodo, setEditingTodo }) => {
  const [text, setText] = useState(todo ? todo.text : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Harap isi tugas yang harus dilakukan!",
      });
      return;
    }

    if (todo) {
      updateTodo({ ...todo, text: trimmedText });
    } else {
      addTodo(trimmedText);
    }

    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mt-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tulis tugas baru..."
        className="border border-gray-300 rounded-md px-4 py-2 flex-grow focus:outline-none focus:ring focus:border-blue-300"
      />

      <button
        type="submit"
        className={`px-4 py-2 rounded-md ${
          todo ? "bg-green-500 hover:bg-green-600" : "bg-blue-400 hover:bg-blue-600"
        } text-white font-semibold focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500`}
      >
        {todo ? "Perbarui" : "Tambah"}
      </button>

      {todo && (
        <button
          type="button"
          onClick={() => setEditingTodo(null)}
          className="px-4 py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-white font-semibold focus:outline-none focus:ring focus:ring-offset-2 focus:ring-gray-500"
        >
          Tidak
        </button>
      )}
    </form>
  );
};

export default TodoForm;
