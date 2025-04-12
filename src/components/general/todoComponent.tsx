import React, { useState } from "react";
import {
  Trash2,
  Pin,
  X,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import axios from "axios";

const TodoCard = ({ todo, onUpdate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  // Format date to readable string
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Toggle status between PENDING and COMPLETED
  const toggleStatus = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/toggle-completion-status/${todo.id}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  // Toggle pin status
  const togglePin = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/toggle-pin-status/${todo.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user") || ""}`,
          },
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error toggling pin status:", error);
    }
  };

  // Handle delete
  const handleDelete = () => {
    if (onDelete) {
      onDelete(todo.id);
    }
  };

  // Handle form submission for updates
  const handleUpdate = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(editedTodo);
      setIsOpen(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo((prev) => ({ ...prev, [name]: value }));
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800";
      case "LOW":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get priority icon
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "HIGH":
        return <AlertTriangle className="w-3 h-3 mr-1" />;
      case "MEDIUM":
        return <Clock className="w-3 h-3 mr-1" />;
      case "LOW":
        return <CheckCircle className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full">
      {/* Main Todo Card */}
      {todo && (
        <div
          className={`p-6 mb-4 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg 
          ${
            todo?.status === "COMPLETED"
              ? "bg-gradient-to-r from-violet-50 to-violet-300/30"
              : "bg-white"
          } 
          ${
            todo?.pinned === "PINNED"
              ? "border-l-2 border-violet-500"
              : "border border-gray-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              {/* Checkbox */}
              <div
                onClick={toggleStatus}
                className={`w-6 h-6 rounded-full border cursor-pointer flex items-center justify-center transition-all duration-300 ${
                  todo.status === "COMPLETED"
                    ? "bg-violet-600 border-violet-700"
                    : "border-gray-400 hover:border-violet-500"
                }`}
              >
                {todo.status === "COMPLETED" && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              {/* Title and Information */}
              <div
                className="flex-1 cursor-pointer group"
                onClick={() => setIsOpen(true)}
              >
                <h3
                  className={`font-medium text-lg transition-all text-[#410F80]/80 duration-300 group-hover:text-[#410F80] ${
                    todo.status === "COMPLETED"
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title.toUpperCase()}
                </h3>

                {/* Description preview - new! */}
                {todo.description && (
                  <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                    {todo.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center text-xs mt-2 gap-2">
                  {/* Due date */}
                  <span className="flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(todo.deadline)}
                  </span>

                  {/* Priority */}
                  <span
                    className={`flex items-center px-2 py-1 rounded-full ${getPriorityColor(
                      todo.priority
                    )}`}
                  >
                    {getPriorityIcon(todo.priority)}
                    {todo.priority.charAt(0) +
                      todo.priority.slice(1).toLowerCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePin}
                className={`p-2  transition-all duration-300 ${
                  todo.pinned === "PINNED"
                    ? "text-violet-600 bg-violet-100"
                    : "text-gray-400 hover:text-violet-600 hover:bg-violet-50"
                }`}
              >
                <Pin className="w-5 h-5" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2  text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for editing */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-scaleIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-violet-800">
                Todo Details
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editedTodo.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                  placeholder="Task title"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editedTodo.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all h-24"
                  placeholder="Add task details here..."
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={
                    new Date(editedTodo.deadline).toISOString().split("T")[0]
                  }
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={editedTodo.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              <div className="flex items-center mb-4">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={editedTodo.pinned === "PINNED"}
                      onChange={() =>
                        setEditedTodo((prev) => ({
                          ...prev,
                          pinned:
                            prev.pinned === "PINNED" ? "UNPINNED" : "PINNED",
                        }))
                      }
                    />
                    <div
                      className={`w-10 h-5 bg-gray-300 rounded-full shadow-inner transition-all duration-300 ${
                        editedTodo.pinned === "PINNED" ? "bg-violet-500" : ""
                      }`}
                    ></div>
                    <div
                      className={`absolute w-5 h-5 bg-white rounded-full shadow top-0 transition-all duration-300 ${
                        editedTodo.pinned === "PINNED"
                          ? "transform translate-x-5"
                          : "left-0"
                      }`}
                    ></div>
                  </div>
                  <div className="ml-3 text-gray-700 font-medium">
                    Pin to dashboard
                  </div>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all duration-300"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TodoCard;
