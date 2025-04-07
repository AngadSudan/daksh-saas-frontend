import React, { useState } from "react";
import { Trash2, Pin, X, Calendar } from "lucide-react";
import axios from "axios";

// Mock data for demonstration
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

const TodoCard = ({ todo = todoExample, onUpdate, onDelete }) => {
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
    const newStatus = todo.status === "PENDING" ? "COMPLETED" : "PENDING";
    // /toggle-completion-status/:todoid

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/toggle-completion-status/${todo.id}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    );

    console.log(response);
    if (onUpdate) {
      onUpdate({ ...todo, status: newStatus });
    }
  };

  // Toggle pin status
  const togglePin = async () => {
    // /toggle-pin-status/:todoid

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/toggle-pin-status/${todo.id}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    );
    console.log(response);
    const newPinned = todo.pinned === "PINNED" ? "UNPINNED" : "PINNED";
    if (onUpdate) {
      onUpdate({ ...todo, pinned: newPinned });
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

  return (
    <div className="relative">
      {/* Main Todo Card */}

      <div
        className={`p-4 mb-2 rounded-lg shadow border ${
          todo.status === "COMPLETED"
            ? "bg-green-50 border-green-200"
            : "bg-white border-gray-200"
        } ${todo.pinned === "PINNED" ? "border-l-4 border-l-blue-500" : ""}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            {/* Checkbox */}
            <div
              onClick={toggleStatus}
              className={`w-6 h-6 rounded-full border cursor-pointer flex items-center justify-center ${
                todo.status === "COMPLETED"
                  ? "bg-green-500 border-green-600"
                  : "border-gray-400"
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

            {/* Title */}
            <div
              className="flex-1 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <h3
                className={`font-medium ${
                  todo.status === "COMPLETED"
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </h3>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Calendar className="w-3 h-3 mr-1" />
                <span>Due: {formatDate(todo.deadline)}</span>
                {todo.priority === "HIGH" && (
                  <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">
                    High
                  </span>
                )}
                {todo.priority === "MEDIUM" && (
                  <span className="ml-2 px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    Medium
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={togglePin}
              className={`p-1 rounded-full ${
                todo.pinned === "PINNED"
                  ? "text-blue-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Pin className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 rounded-full text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for editing */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Todo Details</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editedTodo.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editedTodo.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg h-24"
                />
              </div>

              <div className="mb-4">
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
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={editedTodo.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              <div className="flex space-x-3 items-center mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editedTodo.pinned === "PINNED"}
                    onChange={() =>
                      setEditedTodo((prev) => ({
                        ...prev,
                        pinned:
                          prev.pinned === "PINNED" ? "UNPINNED" : "PINNED",
                      }))
                    }
                    className="mr-2"
                  />
                  Pin to dashboard
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-700 border rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
// Demo component to show how to use TodoCard

// export default TodoCardDemo;
