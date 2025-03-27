import React, { useState } from "react";
import {
  Check,
  Trash2,
  Edit,
  Pin,
  Info,
  X,
  Save,
  Calendar,
  Clock,
  AlertCircle,
} from "lucide-react";

const TodoComponent = ({ todo, onDelete, onUpdate, onToggleComplete }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  // Enhanced color palette with more depth and sophistication
  const colors = {
    background: {
      main: "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]",
      dialog: "bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
    },
    priorityColors: {
      LOW: {
        bg: "bg-emerald-500/20 hover:bg-emerald-500/30",
        text: "text-emerald-300 group-hover:text-emerald-200",
      },
      MEDIUM: {
        bg: "bg-amber-500/20 hover:bg-amber-500/30",
        text: "text-amber-300 group-hover:text-amber-200",
      },
      HIGH: {
        bg: "bg-rose-500/20 hover:bg-rose-500/30",
        text: "text-rose-300 group-hover:text-rose-200",
      },
    },
    statusColors: {
      PENDING: "bg-sky-500/20 text-sky-300 hover:bg-sky-500/30",
      COMPLETED: "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30",
      CANCELLED: "bg-red-500/20 text-red-300 hover:bg-red-500/30",
    },
  };

  const handleSave = () => {
    onUpdate(editedTodo);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className={`
        group relative 
        ${colors.background.main} 
        rounded-2xl p-5 mb-5 text-white 
        shadow-xl transition-all duration-300 
        ${todo.pinned === "PINNED" ? "ring-4 ring-amber-500/50" : ""}
        hover:scale-[1.02] hover:shadow-2xl
      `}
      onClick={() => setIsDialogOpen(true)}
    >
      {/* Main Todo View */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {todo.pinned === "PINNED" && (
            <Pin className="text-amber-400 w-6 h-6 animate-bounce" />
          )}
          <span className="text-lg font-bold truncate max-w-[250px] tracking-wider">
            {todo.title}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Priority Indicator with Tooltip */}
          <div
            className={`
              w-4 h-4 rounded-full 
              ${colors.priorityColors[todo.priority].bg}
              group/priority relative
            `}
            title={`${todo.priority} Priority`}
          >
            <span
              className="
              absolute -top-8 left-1/2 -translate-x-1/2 
              bg-black/70 text-white text-xs 
              px-2 py-1 rounded-md 
              opacity-0 group-hover/priority:opacity-100 
              transition-opacity duration-200
            "
            >
              {todo.priority} Priority
            </span>
          </div>

          {/* Action Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(todo.id);
            }}
            className="text-emerald-500 hover:bg-emerald-500/20 p-2 rounded-full transition-all"
          >
            <Check className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo.id);
            }}
            className="text-rose-500 hover:bg-rose-500/20 p-2 rounded-full transition-all"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Dialog/Modal */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsDialogOpen(false)}
        >
          <div
            className={`
              relative w-full max-w-md 
              ${colors.background.dialog}
              rounded-3xl shadow-2xl overflow-hidden
              animate-scale-up border border-white/10
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-4 right-4 z-10 text-white/50 hover:text-white transition-all"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Dialog Content */}
            <div className="p-8 space-y-6">
              {isEditing ? (
                // Editing View
                <div className="space-y-5">
                  <input
                    name="title"
                    value={editedTodo.title}
                    onChange={handleInputChange}
                    className="
                      w-full bg-white/10 text-white 
                      p-4 rounded-xl border border-white/20 
                      focus:ring-2 focus:ring-sky-500/50 
                      transition-all placeholder-white/40
                    "
                    placeholder="Enter Todo Title"
                  />
                  <textarea
                    name="description"
                    value={editedTodo.description}
                    onChange={handleInputChange}
                    className="
                      w-full bg-white/10 text-white 
                      p-4 rounded-xl border border-white/20 
                      focus:ring-2 focus:ring-sky-500/50 
                      transition-all h-32 
                      placeholder-white/40
                    "
                    placeholder="Add Description"
                  />

                  {/* Pinned Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="inline-flex items-center cursor-pointer group">
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
                        className="sr-only peer"
                      />
                      <div
                        className="
                        w-14 h-8 bg-white/20 
                        rounded-full peer peer-checked:bg-amber-500 
                        after:content-[''] after:absolute 
                        after:top-[4px] after:left-[4px] 
                        after:bg-white after:rounded-full 
                        after:h-6 after:w-6 after:transition-all
                        peer-checked:after:translate-x-full
                        relative group-hover:bg-white/30
                      "
                      ></div>
                      <span className="ml-4 text-sm text-white/70 group-hover:text-white transition-all">
                        Pin Todo
                      </span>
                    </label>
                  </div>

                  {/* Status Dropdown */}
                  <div className="relative">
                    <select
                      name="status"
                      value={editedTodo.status}
                      onChange={handleInputChange}
                      className="
                        w-full bg-white/10 text-white 
                        p-4 rounded-xl border border-white/20 
                        focus:ring-2 focus:ring-sky-500/50
                        appearance-none
                      "
                    >
                      <option value="PENDING">Pending</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Save/Cancel Buttons */}
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="
                        flex-1 bg-sky-500 text-white 
                        p-4 rounded-xl 
                        flex items-center justify-center 
                        space-x-3 font-semibold
                        hover:bg-sky-600 transition-all
                        shadow-xl hover:shadow-sky-500/50
                      "
                    >
                      <Save className="w-6 h-6" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="
                        flex-1 bg-white/10 text-white 
                        p-4 rounded-xl 
                        flex items-center justify-center 
                        space-x-3
                        hover:bg-white/20 transition-all
                      "
                    >
                      <X className="w-6 h-6" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                // Read-only View
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold flex items-center space-x-3">
                      {todo.pinned === "PINNED" && (
                        <Pin className="text-amber-400" />
                      )}
                      <span>{todo.title}</span>
                    </h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-white/50 hover:text-white transition-all"
                    >
                      <Edit className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <p className="flex items-center space-x-3 text-white/80 text-lg">
                      <Info className="w-6 h-6 text-sky-300" />
                      <span>{todo.description}</span>
                    </p>

                    <div className="flex space-x-3">
                      <span
                        className={`
                          px-3 py-1 rounded-full text-sm 
                          ${colors.priorityColors[todo.priority].bg} 
                          ${colors.priorityColors[todo.priority].text}
                        `}
                      >
                        {todo.priority} Priority
                      </span>
                      <span
                        className={`
                          px-3 py-1 rounded-full text-sm 
                          ${colors.statusColors[todo.status]}
                        `}
                      >
                        {todo.status}
                      </span>
                    </div>

                    <div className="text-sm text-white/60 space-y-2">
                      <p className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-emerald-300" />
                        <span>
                          Created: {new Date(todo.createdAt).toLocaleString()}
                        </span>
                      </p>
                      <p className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-sky-300" />
                        <span>
                          Updated: {new Date(todo.updatedAt).toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoComponent;
