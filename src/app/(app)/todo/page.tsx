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
  CheckCircle,
  ListTodo,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

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
        if (response.data.error) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
        }
        setTodos(response.data.data);
        setFilteredTodos(response.data.data);
      } catch (error) {
        console.error("Failed to load todos:", error);
        toast.error("Failed to load tasks. Please try again.");
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
      setTodos((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
      const response = await axios.put(
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
      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
      toast.error("Failed to update task. Please try again.");
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
      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
      }
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
      toast.error("Failed to create task. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/set-visibility-hidden/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        toast.success("Task deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  // Count tasks by status
  const pendingCount = todos.filter((todo) => todo.status === "PENDING").length;
  const completedCount = todos.filter(
    (todo) => todo.status === "COMPLETED"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#333",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            padding: "16px",
          },
          success: {
            iconTheme: {
              primary: "#480179",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* Add Todo Modal */}
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
                className="w-full bg-[#480179] text-white py-3 rounded-lg hover:bg-[#5C0C99] transition-colors flex items-center justify-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Check className="mr-2" size={20} />
                Create Task
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => (window.location.href = "/home")}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors transform hover:-translate-y-0.5 hover:shadow-lg"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-3xl font-bold bg-[#480179]  text-transparent bg-clip-text">
              My Tasks
            </h1>
          </div>
          <button
            onClick={() => setAddTodo(true)}
            className="flex items-center bg-[#480179] text-white px-5 py-2.5 rounded-lg hover:bg-[#5C0C99] transition-colors font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <PlusCircle className="mr-2" size={20} />
            New Task
          </button>
        </div>

        {/* Task Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <ListTodo size={24} className="text-[#480179]" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-800">{todos.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex items-center ">
            <div className="bg-amber-100 p-3 rounded-lg mr-4">
              <Clock size={24} className="text-amber-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-gray-800">{pendingCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex items-center ">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <CheckCircle size={24} className="text-green-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-2xl font-bold text-gray-800">
                {completedCount}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md mb-6 p-4">
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
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#480179] focus:border-transparent shadow-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("ALL")}
                className={`px-4 py-2.5 rounded-lg flex items-center shadow-sm transition-all duration-200 ${
                  filter === "ALL"
                    ? "bg-[#480179] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Filter size={16} className="mr-1.5" />
                All
              </button>
              <button
                onClick={() => setFilter("PENDING")}
                className={`px-4 py-2.5 rounded-lg flex items-center shadow-sm transition-all duration-200 ${
                  filter === "PENDING"
                    ? "bg-[#480179] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Clock size={16} className="mr-1.5" />
                Pending
              </button>
              <button
                onClick={() => setFilter("COMPLETED")}
                className={`px-4 py-2.5 rounded-lg flex items-center shadow-sm transition-all duration-200 ${
                  filter === "COMPLETED"
                    ? "bg-[#480179] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Check size={16} className="mr-1.5" />
                Completed
              </button>
            </div>
          </div>
        </div>

        {/* Task List or Empty State */}
        <div className="flex-grow">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-64 bg-white rounded-xl shadow-md p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#480179] mb-4"></div>
              <p className="text-gray-600">Loading your tasks...</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-8 text-center h-64 flex flex-col justify-center items-center"
            >
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <AlertCircle size={48} className="text-[#480179]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {searchTerm || filter !== "ALL"
                  ? "No matching tasks found"
                  : "No tasks yet"}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                {searchTerm || filter !== "ALL"
                  ? "Try changing your search or filter criteria"
                  : "Get started by creating your first task"}
              </p>
              {!searchTerm && filter === "ALL" && (
                <button
                  onClick={() => setAddTodo(true)}
                  className="bg-[#480179] text-white px-6 py-2.5 rounded-lg hover:bg-[#5C0C99] transition-all duration-200 flex items-center justify-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <PlusCircle className="mr-2" size={18} />
                  Create Task
                </button>
              )}
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredTodos.map((todo) => (
                  <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <TodoCard
                      todo={todo}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="mt-8 text-center text-gray-500 text-sm py-4">
          <p>Stay organized and boost your productivity</p>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
