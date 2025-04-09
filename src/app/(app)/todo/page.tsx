"use client";
import TodoCard from "@/components/general/todoComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  PlusCircle,
  ArrowLeft,
  Calendar,
  Search,
  Filter,
  Clock,
  AlertCircle,
} from "lucide-react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [addTodo, setAddTodo] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "MEDIUM",
  });

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.href = "/login";
    }
  }, []);
  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/get-todo`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );
        console.log(response.data.data);
        setTodos(response.data.data);
        setFilteredTodos(response.data.data);
      } catch (error) {
        console.error("Failed to load todos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    // Filter and search todos whenever todos, filter, or searchTerm changes
    let result = [...todos];

    // Apply status filter
    if (filter !== "ALL") {
      result = result.filter((todo) => todo.status === filter);
    }

    // Apply search term
    if (searchTerm) {
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          todo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTodos(result);
  }, [todos, filter, searchTerm]);

  const handleChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (updatedTodo) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/update-todo/${updatedTodo.id}`,
        {
          title: updatedTodo.title,
          description: updatedTodo.description,
          deadline: updatedTodo.deadline,
          priority: updatedTodo.priority,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      setTodos((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/create-todo`,
        newTodo,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      setTodos((prev) => [...prev, response.data.data]);
      setAddTodo(false);
      setNewTodo({
        title: "",
        description: "",
        deadline: "",
        priority: "MEDIUM",
      });
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/set-visibility-hidden/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              <button
                type="button"
                onClick={() => setAddTodo(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Add New Task
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Task Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTodo.title}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#480179]"
                  placeholder="What needs to be done?"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Deadline
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={newTodo.deadline}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#480179]"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={newTodo.priority}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#480179] bg-white"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              <div className="mb-6">
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
                  className="w-full p-3 border border-gray-300 focus:ring-[#480179] rounded-lg focus:outline-none focus:ring-2 resize-none"
                  placeholder="Add details about this task..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#480179] text-white py-3 rounded-lg hover:bg-[#5C0C99] transition-colors flex items-center justify-center font-medium"
              >
                <Check className="mr-2" size={20} />
                Create Task
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => (window.location.href = "/home")}
              className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
          </div>
          <button
            onClick={() => setAddTodo(true)}
            className="flex items-center bg-[#480179] text-white px-5 py-2.5 rounded-lg hover:bg-[#5C0C99] transition-colors font-medium shadow-sm"
          >
            <PlusCircle className="mr-2" size={20} />
            New Task
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#480179] focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("ALL")}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  filter === "ALL"
                    ? "bg-[#480179] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
              >
                <Filter size={16} className="mr-1.5" />
                All
              </button>
              <button
                onClick={() => setFilter("PENDING")}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  filter === "PENDING"
                    ? "bg-[#480179] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
              >
                <Clock size={16} className="mr-1.5" />
                Pending
              </button>
              <button
                onClick={() => setFilter("COMPLETED")}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  filter === "COMPLETED"
                    ? "bg-[#480179] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
              >
                <Check size={16} className="mr-1.5" />
                Completed
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#480179]"></div>
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No tasks found
            </h3>
            <p className="text-gray-500">
              {searchTerm || filter !== "ALL"
                ? "Try changing your search or filter"
                : "Create your first task to get started"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTodos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TodoCard
                  todo={todo}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
