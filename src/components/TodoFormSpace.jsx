import React, { useState } from "react";
import Swal from "sweetalert2";

function TodoFormSpace({ addTodo, todo, updateTodo, setEditingTodo }) {
  const [text, setText] = useState(todo ? todo.text : "");
  const [priority, setPriority] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Harap isi tugas yang harus dilakukan!",
      });
      return;
    }

    if (!priority) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Harap pilih prioritas tugas!",
      });
      return;
    }

    if (todo) {
      updateTodo({ ...todo, text, priority });
    } else {
      addTodo(text, priority);
    }

    if (!todo) {
      setText("");
      setPriority("Tidak Juga");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-3 mt-3">
        {/* Input untuk teks tugas */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tulis tugas baru..."
          className="text-white rounded-md px-4 py-2 flex-grow bg-gray-800 focus:outline-none focus:ring focus:border-blue-500"
        />

        <button
          type="submit"
          className={`px-4 py-2 rounded-md ${
            todo
              ? "bg-green-500 hover:bg-green-700"
              : "bg-gradient-to-r from-blue-900 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md border-2 border-blue-800"
          } text-white font-semibold focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500`}
        >
          {todo ? "Perbarui" : "Tambah"}
        </button>
      </form>

      {/* Tombol Radio untuk Prioritas */}
      <div className="flex items-center gap-7 p-2">
        <label className="text-white text-sm">
          <input
            type="radio"
            value="Tidak Juga"
            checked={priority === "Tidak Juga"}
            onChange={(e) => setPriority(e.target.value)}
            className="mr-1 accent-blue-500"
          />
          Tidak Juga
        </label>
        <label className="text-white text-sm">
          <input
            type="radio"
            value="Perlu"
            checked={priority === "Perlu"}
            onChange={(e) => setPriority(e.target.value)}
            className="mr-1 accent-yellow-500"
          />
          Perlu
        </label>
        <label className="text-white text-sm">
          <input
            type="radio"
            value="Prioritas"
            checked={priority === "Prioritas"}
            onChange={(e) => setPriority(e.target.value)}
            className="mr-1 accent-red-500"
          />
          Prioritas
        </label>
      </div>

      {todo && (
        <button
          type="button"
          onClick={() => setEditingTodo(null)}
          className="px-4 py-2 mt-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold focus:outline-none focus:ring focus:ring-offset-2 focus:ring-red-500"
        >
          Tidak Jadi
        </button>
      )}
    </>
  );
}

export default TodoFormSpace;
