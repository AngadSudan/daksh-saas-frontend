"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  HelpCircle,
  Calendar,
  ChevronRight,
  X,
  Plus,
  Edit3,
  Loader,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

function Page() {
  const params = useParams();
  const [allQuiz, setAllQuiz] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    number: 5,
    description: "",
  });

  const handleChange = (e) => {
    setNewQuiz({ ...newQuiz, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchAllQuiz = async () => {
      setIsLoading(true);
      try {
        // let response= {};
        // if(localStorage.getItem("token")===)
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/interaction/get-all-quiz/${params.noteid}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        setAllQuiz(response.data.data);
      } catch (error) {
        toast.error("Failed to load quizzes");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllQuiz();
  }, [params.noteid]);

  const handleSubmit = async () => {
    if (!newQuiz.title.trim()) {
      toast.error("Please enter a quiz title");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/create-quiz/${params.noteid}`,
        {
          title: newQuiz.title,
          number: newQuiz.number,
          description: newQuiz.description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);

      toast.success("Quiz created successfully!");

      // Reset form and close modal
      setNewQuiz({
        title: "",
        number: 5,
        description: "",
      });
      setIsFormOpen(false);

      // Refresh quiz list
      const updatedResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/interaction/get-all-quiz/${params.noteid}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAllQuiz(updatedResponse.data.data);
    } catch (error) {
      toast.error("Error creating quiz");
      console.error("Error creating quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <Toaster />

      {/* Header with create button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center">
            <ArrowLeft
              onClick={() =>
                (window.location.href = `/subject/${params.noteid}`)
              }
              className="text-violet-600 mr-2"
              size={24}
            />
            <h1 className="text-2xl font-bold text-gray-800">Quizzes</h1>
          </div>
          <p className="text-gray-500 mt-1">
            Test your knowledge with interactive quizzes
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFormOpen(true)}
          className="flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Plus size={18} className="mr-2" />
          Create Quiz
        </motion.button>
      </div>

      {/* Quiz grid with loading state */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader className="animate-spin text-violet-500 mb-4" size={40} />
          <p className="text-gray-500">Loading quizzes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {allQuiz.length > 0 ? (
            allQuiz.map((quiz) => (
              <QuizCard quiz={quiz} key={quiz.id || quiz._id} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">
                No quizzes yet
              </h3>
              <p className="text-gray-500 mt-2 max-w-md">
                Create your first quiz by clicking the "Create Quiz" button
                above
              </p>
            </div>
          )}
        </div>
      )}

      {/* Quiz creation modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-violet-600 p-2 rounded-md shadow-sm">
                    <Edit3 size={18} className="text-white" />
                  </div>
                  <h3 className="ml-3 font-semibold text-xl text-gray-800">
                    Create New Quiz
                  </h3>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quiz Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newQuiz.title}
                      onChange={handleChange}
                      placeholder="Enter quiz title"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={newQuiz.description}
                      onChange={handleChange}
                      placeholder="Enter quiz description"
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Questions: {newQuiz.number}
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        name="number"
                        value={newQuiz.number}
                        min={1}
                        max={100}
                        onChange={handleChange}
                        step={1}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg mr-2 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg shadow-sm hover:shadow-md transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin mr-2" size={16} />
                        Creating...
                      </>
                    ) : (
                      "Generate Quiz"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Page;

const QuizCard = ({ quiz }) => {
  // Format date for better readability
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
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(124, 58, 237, 0.15)" }}
      transition={{ duration: 0.3 }}
      onClick={() => (window.location.href = `quiz/${quiz.id || quiz._id}`)}
      className="rounded-xl overflow-hidden shadow-md border border-gray-100 bg-white cursor-pointer w-full"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-violet-600" />

      <div className="p-5">
        <div className="flex items-start justify-between">
          {/* Left side with icon and title */}
          <div className="flex-1">
            <div className="flex items-center">
              <div className="bg-violet-600 p-2 rounded-full shadow-sm mr-3">
                <HelpCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-violet-600 bg-violet-50 px-2 py-1 rounded">
                  Quiz
                </span>
              </div>
            </div>

            <h2 className="font-bold text-lg text-gray-800 mt-3 line-clamp-1">
              {quiz.title}
            </h2>

            {/* Description with truncation */}
            <div className="mt-2 text-gray-600 text-sm">
              <p className="line-clamp-2">
                {quiz.description || "No description available"}
              </p>
            </div>
          </div>

          {/* Right side with call to action */}
          <div className="ml-4 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-violet-100 p-2 rounded-full"
            >
              <ChevronRight className="h-5 w-5 text-violet-600" />
            </motion.div>
          </div>
        </div>

        {/* Footer with metadata */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(quiz.createdAt)}</span>
          </div>

          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-xs font-medium text-violet-600 bg-violet-50 px-3 py-1 rounded-full flex items-center"
          >
            Start Quiz
            <ChevronRight className="ml-1 h-3 w-3" />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};
