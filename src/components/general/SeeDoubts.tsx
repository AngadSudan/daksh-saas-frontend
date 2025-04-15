import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  MessageCircle,
  Clock,
  AlertCircle,
  Loader,
  Trash2,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

function SeeDoubts({ setOnOpen, chapterId, CommunityCreator }) {
  const [newDoubt, setNewDoubt] = useState("");
  const [loading, setLoading] = useState(false);
  const [doubts, setDoubts] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [disbleForSpam, setDisableForSpam] = useState(false);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [doubts]);

  const handleCreation = async () => {
    if (!newDoubt.trim()) {
      toast.error("Please enter your doubt");
      return;
    }
    setLoading(true);
    setDisableForSpam(true);
    console.log("button disabled");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/interaction/create-interaction`,
        { message: newDoubt, chapterId, messageType: "DOUBTS" },
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
        setNewDoubt("");

        // Add the new doubt to the list
        const newDoubtData = response.data.data || {
          id: new Date().getTime().toString(),
          message: newDoubt,
          createdAt: new Date().toISOString(),
          messageType: "DOUBT",
          raisedBy: localStorage.getItem("token"),
        };

        setDoubts((prev) => [...prev, newDoubtData]);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message || "Error creating doubt");
    } finally {
      setInterval(() => {
        setDisableForSpam(false);
        console.log("button enabled");
      }, 20000);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/interaction/get-doubts/${chapterId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );

        // Set all data without filtering
        setDoubts(response.data.data || []);
      } catch (error) {
        toast.error(error.message || "Failed to load doubts");
      } finally {
        setIsLoadingData(false);
      }
    };
    loadData();
  }, [chapterId]);

  // Format date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <AnimatePresence>
      <Toaster />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={() => setOnOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8 relative"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setOnOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>

          <div className="flex items-center justify-center mb-6">
            <MessageCircle className="text-violet-600 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Chill Out & Have a Doubt
            </h2>
          </div>

          {/* Doubts List - Chat UI */}
          <div
            ref={messagesContainerRef}
            className="bg-gray-50 rounded-xl h-[350px] overflow-y-auto mb-6 scroll-smooth"
          >
            {isLoadingData ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader
                  className="animate-spin text-violet-500 mb-2"
                  size={24}
                />
                <p className="text-gray-500">Loading doubts...</p>
              </div>
            ) : doubts.length > 0 ? (
              <div className="p-4 space-y-4 flex flex-col">
                {doubts.map((doubt) => (
                  <DoubtMessage
                    key={doubt.id || `doubt-${doubt.createdAt}`}
                    todoId={doubt.id}
                    message={doubt.message}
                    createdAt={doubt.createdAt}
                    formatDate={formatDate}
                    isCurrentUser={
                      doubt.raisedBy === localStorage.getItem("token")
                    }
                    isAdmin={CommunityCreator === localStorage.getItem("token")}
                    userName={doubt.user?.name || "User"}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
                <AlertCircle className="mb-2" size={32} />
                <p>No doubts yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Ask a question to get started
                </p>
              </div>
            )}
          </div>

          {/* Input for new doubt */}
          <div className="relative">
            <div className="flex">
              <input
                type="text"
                placeholder="Ask your doubt..."
                value={newDoubt}
                onChange={(e) => setNewDoubt(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                disabled={loading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleCreation();
                  }
                }}
              />
              <button
                onClick={() => {
                  if (!disbleForSpam) {
                    handleCreation();
                  }
                }}
                disabled={disbleForSpam}
                className="bg-violet-600 hover:bg-violet-700 text-white px-4 rounded-r-lg flex items-center justify-center transition-colors"
              >
                {loading ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const DoubtMessage = ({
  message,
  createdAt,
  formatDate,
  isCurrentUser,
  userName,
  isAdmin,
  todoId,
}) => {
  const handleDelete = async () => {
    try {
      alert(todoId);
      console.log(todoId);
      if (!todoId) return;
      const resposne = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/interaction/delete-interaction/${todoId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (resposne.data.error) {
        toast.error(resposne.data.message);
      } else {
        toast.success(resposne.data.message);
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`flex my-1 items-center gap-2 ${
        isCurrentUser ? "justify-end" : "justify-start"
      } w-full`}
    >
      <div
        className={`rounded-lg p-4 max-w-[80%] ${
          isCurrentUser
            ? "bg-violet-600 text-white rounded-br-none"
            : "bg-white border border-gray-200 shadow-sm rounded-bl-none"
        }`}
      >
        {!isCurrentUser && (
          <div className="font-medium text-xs text-gray-500 mb-1">
            {userName}
          </div>
        )}
        <p
          className={`${
            isCurrentUser ? "text-white" : "text-gray-800"
          } break-words`}
        >
          {message}
        </p>
        <div
          className={`flex items-center text-xs mt-2 ${
            isCurrentUser ? "text-violet-200 justify-end" : "text-gray-500"
          }`}
        >
          <Clock size={12} className="mr-1" />
          <span>{formatDate(createdAt)}</span>
        </div>
      </div>
      {(isAdmin || isCurrentUser) && (
        <div>
          <Trash2
            onClick={() => {
              handleDelete();
            }}
            className="w-5 h-5 my-auto bg-gray-200"
          />
        </div>
      )}
    </div>
  );
};

export default SeeDoubts;
