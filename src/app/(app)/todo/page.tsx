"use client";
import TodoCard from "@/components/general/todoComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, PlusCircle } from "lucide-react";
const todoExample = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Complete project proposal",
  description: "Draft the initial proposal for the client meeting next week",
  deadline: new Date("2025-04-15T00:00:00"),
  pinned: "UNPINNED",
  status: "PENDING",
  visibility: "VISIBLE",
  priority: "MEDIUM",
  createdAt: new Date("2025-03-25T10:00:00"),
  updatedAt: new Date("2025-03-26T11:30:00"),
};

function TodoList() {
  const [todos, setTodos] = useState([todoExample]);
  const [addTodo, setAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  useEffect(() => {
    const loadTodos = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/get-todo`,
        { withCredentials: true }
      );
      console.log(response.data.data);
      setTodos(response.data.data);
    };
    loadTodos();
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (updatedTodo) => {
    // update-todo/:todoid
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/update-todo/${updatedTodo.id}`,
      {
        title: updatedTodo.title,
        description: updatedTodo.description,
        deadline: updatedTodo.deadline,
        priority: updatedTodo.priority,
      },
      { withCredentials: true }
    );
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };
  const handleSubmit = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/create-todo`,
      {
        ...newTodo,
      },
      { withCredentials: true }
    );
    console.log(response.data.data);
    // setTodos((prev) => [...prev, response.data.data]);
    console.log(newTodo);
  };

  const handleDelete = async (id) => {
    //add api call to hide the todo
    // /set-visibility-hidden/:todoid
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/set-visibility-hidden/${id}`
    );
    console.log(response.data.data);

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-full h-screen relative">
      <AnimatePresence>
        {addTodo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setAddTodo(false)}
          >
            <motion.form
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setAddTodo(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Add new To-Do
              </h2>

              {/* Community Name Input */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Community Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="title"
                  value={newTodo.title}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#480179] `}
                  placeholder="Enter todo title"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Community Name
                </label>
                <input
                  type="date"
                  id="name"
                  name="deadline"
                  value={newTodo.deadline}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#480179] `}
                  placeholder="Enter todo title"
                />
              </div>

              {/* Description Input */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newTodo.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full p-3 border border-gray-300 focus:ring-[#480179] rounded-lg focus:outline-none focus:ring-2 resize-none `}
                  placeholder="Describe your community"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onSubmit={handleSubmit}
                className="w-full bg-[#480179] text-white py-3 rounded-lg hover:bg-[#5C0C99] transition-colors flex items-center justify-center"
              >
                <Check className="mr-2" size={20} />
                List Todo
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="p-4 max-w-[60%] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Todos</h1>
          <button
            onClick={() => setAddTodo(true)}
            className="flex items-center bg-[#480179] text-white px-4 py-2 rounded-lg hover:bg-[#480179]/80 transition-colors"
          >
            <PlusCircle className="mr-2" size={20} />
            Add a Todo
          </button>
        </div>
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
