import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import backgroundImage from "./assets/baground7.jpg";
import backgroundImage2 from "./assets/kertas6.png";
import FullListPage from "./components/FullListPage";
import api from "./services/api.js";
import Swal from "sweetalert2";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const maxTodos = 15;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get("/todos");
        setTodos(res.data);
      } catch (err) {
        setError("Error fetching todos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    if (todos.length + 1 > maxTodos) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "kertas tidak cukup!",
      });
      return;
    }

    try {
      const res = await api.post("/todos", { text, completed: false });
      setTodos([...todos, res.data]);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error adding todo!",
      });
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error deleting todo!",
      });
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      await api.put(`/todos/${updatedTodo.id}`, updatedTodo);
      setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
      setEditingTodo(null);
    } catch (err) {
      setError("Error updating todo");
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    try {
      await api.put(`/todos/${id}`, { ...todo, completed: !todo.completed });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (err) {
      setError("Error toggling todo completion");
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div
              className="bg-slate-300 min-h-screen p-8 flex flex-col items-center"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Link
                to="/full"
                className="bg-blue-400 text-xs hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg mt-3 mb-1"
              >
                Klik Di Sini Untuk Ganti Tema Luar Angkasa 🚀
              </Link>
              <div
                className="p-6 w-96 mt-24"
                style={{
                  backgroundImage: `url(${backgroundImage2})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "repeat",
                }}
              >
                <h1 className="text-sky-400 text-lg font-bold ml-16 mb-20 w-52 text-center mt-9">
                  Catatan Membeli Bumbu Dapur
                </h1>

                {isLoading ? (
                  <p className="text-white text-center">Loading...</p>
                ) : todos.length > 0 ? (
                  <TodoList
                    todos={todos}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                    toggleComplete={toggleComplete}
                    setEditingTodo={setEditingTodo}
                  />
                ) : (
                  <p className=" text-center">Todo Kosong!</p>
                )}
              </div>
              {todos.length >= maxTodos && (
                <Link
                  to="/full"
                  className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 mb-1"
                >
                  AMBIL LEMBARAN UNLIMITED
                </Link>
              )}
              <TodoForm
                addTodo={addTodo}
                todo={editingTodo}
                updateTodo={updateTodo}
                setEditingTodo={setEditingTodo}
              />
            </div>
          }
        />
        <Route path="/full" element={<FullListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
