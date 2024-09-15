import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import ListFull from "./ListFull";
import backgroundImage from "../assets/angkasa1.jpg";
import { MdAddBox } from "react-icons/md";
import TodoFormSpace from "./TodoFormSpace";

// Animasi bintang berkelap-kelip
const twinklingStars = (count = 100) => {
  let stars = [];
  for (let i = 0; i < count; i++) {
    stars.push(
      <div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      ></div>
    );
  }
  return stars;
};

function FullListPage() {
  const [todospace, setTodospace] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get("/todospace");
        setTodospace(res.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching todos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (text, priority) => {
    try {
      const res = await api.post("/todospace", { text, completed: false, priority });
      setTodospace([...todospace, res.data]);
      setError(null);
    } catch (err) {
      setError("Error adding todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todospace/${id}`);
      setTodospace(todospace.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Error deleting todo");
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      await api.put(`/todospace/${updatedTodo.id}`, updatedTodo);
      setTodospace(
        todospace.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
      setEditingTodo(null);
    } catch (err) {
      setError("Error updating todo");
    }
  };

  const toggleComplete = async (id) => {
    const todo = todospace.find((todo) => todo.id === id);
    try {
      await api.put(`/todospace/${id}`, { ...todo, completed: !todo.completed });
      setTodospace(
        todospace.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (err) {
      setError("Error toggling todo completion");
    }
  };

  return (
    <div
      className="bg-gradient-to-br from-purple-900 to-indigo-800 min-h-screen p-8 flex flex-col items-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {twinklingStars(300)}
      <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-blue-500 top-1/3 left-1/4 animate-orbit"></div>
      <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-orange-400 top-1/4 left-1/4   animate-orbit1"></div>

      {/* Main Content Container */}
      <div className="p-6 w-96 bg-slate-800/75 backdrop-blur-sm rounded-lg shadow-lg mt-2 z-10 relative">
        <h1 className="text-indigo-400 text-lg font-bold text-center mb-4">
          Todo Unlimited
        </h1>
        <TodoFormSpace
          addTodo={addTodo}
          todo={editingTodo}
          updateTodo={updateTodo}
          setEditingTodo={setEditingTodo}
        />

        {/* Todo List (with setEditingTodo passed down) */}
        {isLoading ? ( // Loading state
          <p className="text-white text-center">Loading...</p>
        ) : todospace.length > 0 ? (
          <ListFull
            todos={todospace}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
            toggleComplete={toggleComplete}
            setEditingTodo={setEditingTodo}
          />
        ) : (
          <p className="text-white text-center">Tugas Kosong!</p>
        )}

        {/* Back Button */}
        <Link
          to="/"
          className="bg-gradient-to-r font-mono from-blue-900 to-indigo-700 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md border-2 border-blue-800 py-2 px-4 rounded mt-4 block text-center"
        >
          Kembali ke Halaman Tema Pertama
        </Link>
      </div>
    </div>
  );
}

export default FullListPage;
