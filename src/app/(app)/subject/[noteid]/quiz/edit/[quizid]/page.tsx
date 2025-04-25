"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { CheckCircle, Save, ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

// Question card component for the sidebar
const SlideCard = ({
  question,
  index,
  options,
  changeSlide,
  isActive,
  isModified,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => changeSlide(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 p-4 rounded-lg ${
        isActive
          ? "bg-violet-100 border-r-[3px] border-violet-500"
          : isHovered
          ? "scale-102 bg-gray-50"
          : "scale-100"
      }`}
    >
      <div className="w-full h-auto aspect-video bg-violet-100 rounded-lg border border-violet-300 shadow-md flex flex-col items-center justify-center p-3 transition-all duration-300 relative overflow-hidden">
        {/* Card shine effect */}
        <div
          className={`absolute inset-0 bg-white opacity-0 ${
            isHovered ? "opacity-10" : ""
          } transition-opacity duration-300`}
        ></div>

        {/* Show indicator for modified questions */}
        {isModified && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
        )}

        <h1 className="text-sm font-bold mb-2 text-center px-2 line-clamp-2 text-violet-900">
          {question}
        </h1>

        <div className="grid grid-cols-2 gap-2 w-full px-2">
          {options.map((item, idx) => (
            <div
              key={idx}
              className="bg-white bg-opacity-80 rounded-md p-1 text-center"
            >
              <span className="text-xs font-medium line-clamp-1 text-violet-800">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Loading spinner component
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-gray-50 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
      <Loader className="animate-spin text-violet-600 w-10 h-10 mb-4" />
      <p className="text-violet-800 font-medium">Loading quiz data...</p>
    </div>
  </div>
);

function QuizEditor() {
  const params = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Track modified questions
  const [modifiedQuestionIds, setModifiedQuestionIds] = useState(new Set());

  // State for editing the current question
  const [editedQuestion, setEditedQuestion] = useState({
    id: "",
    quizId: "",
    question: "",
    options: [],
    answers: "",
    visibility: "VISIBLE",
  });

  // Original questions data for comparison
  const [originalQuestions, setOriginalQuestions] = useState([]);
  console.log("original Question is ", originalQuestions);

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      setError(null);

      // Client-side check to ensure we have access to localStorage
      if (typeof window !== "undefined") {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/interaction/get-quiz/${params.quizid}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("user")}`,
              },
            }
          );
          const fetchedQuestions = res.data.data.dbQuestions || [];
          setQuestions(fetchedQuestions);

          // Keep a copy of the original questions for comparison
          setOriginalQuestions(JSON.parse(JSON.stringify(fetchedQuestions)));

          // Reset modified questions tracking
          setModifiedQuestionIds(new Set());

          setLoading(false);
        } catch (error) {
          console.error("Error fetching quiz data:", error);
          setError("Failed to load quiz data. Please try again.");
          setLoading(false);
        }
      }
    };
    fetchQuizData();
  }, [params.quizid]);

  // When current question changes, update the edited question state
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      setEditedQuestion(questions[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, questions]);

  const markQuestionAsModified = (questionId) => {
    setModifiedQuestionIds((prev) => {
      const updated = new Set(prev);
      updated.add(questionId);
      return updated;
    });
  };

  const handleQuestionChange = (e) => {
    if (editedQuestion.id) {
      markQuestionAsModified(editedQuestion.id);
    }

    setEditedQuestion({
      ...editedQuestion,
      question: e.target.value,
    });
  };

  const handleOptionChange = (index, value) => {
    if (editedQuestion.id) {
      markQuestionAsModified(editedQuestion.id);
    }

    const updatedOptions = [...editedQuestion.options];
    const oldValue = updatedOptions[index];
    console.log(oldValue);

    updatedOptions[index] = value;

    // Check if the option being changed was the correct answer
    const updatedAnswers =
      editedQuestion.answers === oldValue ? value : editedQuestion.answers;

    setEditedQuestion({
      ...editedQuestion,
      options: updatedOptions,
      answers: updatedAnswers,
    });
    console.log(editedQuestion);
  };

  const toggleAnswerOption = (optionIndex) => {
    if (editedQuestion.id) {
      markQuestionAsModified(editedQuestion.id);
    }

    const option = editedQuestion.options[optionIndex];

    // Toggle the answer: If the current option is already selected as the answer,
    // then deselect it (set to empty string), otherwise make it the answer
    setEditedQuestion({
      ...editedQuestion,
      answers: editedQuestion.answers === option ? "" : option,
    });
  };

  const saveCurrentQuestionToState = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = editedQuestion;
    setQuestions(updatedQuestions);
    console.log(questions);
  };

  const saveChanges = async () => {
    // First save the current question to the state
    saveCurrentQuestionToState();
    setSaving(true);

    try {
      // Get only the modified questions
      const modifiedQuestions = questions.filter((q) =>
        modifiedQuestionIds.has(q.id)
      );

      if (modifiedQuestions.length === 0) {
        toast.success("No changes to save");
        setSaving(false);
        return;
      }

      console.log("Modified questions:", modifiedQuestions);

      // Prepare the data to be sent (keeping only the necessary fields)
      const questionData = modifiedQuestions.map((q) => ({
        id: q.id,
        quizId: q.quizId,
        question: q.question,
        options: q.options,
        answers: q.answers,
        visibility: q.visibility || "VISIBLE",
      }));

      console.log("Saving modified quiz data:", questionData);

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/interaction/update-quiz/${params.quizid}`,
        { questions: questionData }, // This is the correct structure
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      console.log("Update response:", response.data);
      toast.success(
        `Successfully updated ${modifiedQuestions.length} question(s)`
      );

      // Refactor the quiz data fetching function
      const fetchQuizData = async () => {
        setLoading(true);
        setError(null);

        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/interaction/get-quiz/${params.quizid}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("user")}`,
              },
            }
          );

          const fetchedQuestions = res.data.data.dbQuestions || [];
          setQuestions(fetchedQuestions);

          // Keep a copy of the original questions for comparison
          setOriginalQuestions(JSON.parse(JSON.stringify(fetchedQuestions)));

          // Reset modified questions tracking
          setModifiedQuestionIds(new Set());

          setLoading(false);
        } catch (error) {
          console.error("Error fetching quiz data:", error);
          setError("Failed to load quiz data. Please try again.");
          setLoading(false);
        }
      };

      // After successful update, refresh the quiz data
      await fetchQuizData();
    } catch (error) {
      console.error("Error saving quiz data:", error);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const navigateQuestion = (direction) => {
    // Save current changes before navigating
    saveCurrentQuestionToState();

    // Navigate to next/previous question
    if (direction === "next" && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (direction === "prev" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Function to change slides from sidebar, ensuring current changes are saved
  const changeSlide = (index) => {
    // Save current changes before navigating
    saveCurrentQuestionToState();
    setCurrentQuestionIndex(index);
  };

  // Check if a question has been modified
  const isQuestionModified = (questionId) => {
    return modifiedQuestionIds.has(questionId);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 p-6 rounded-lg shadow-md text-red-600 max-w-md">
          <h3 className="font-bold mb-2">Error</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md text-yellow-600 max-w-md">
          <h3 className="font-bold mb-2">No Questions Found</h3>
          <p>This quiz doesn&quot;t have any questions yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />

      <div className="flex flex-col md:flex-row h-screen">
        {/* Sidebar */}
        <div className="md:w-1/5 bg-white shadow-md flex flex-col h-full">
          <div className="p-4 border-b">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-violet-700 hover:text-violet-900 mb-4"
            >
              <ArrowLeft size={18} className="mr-1" />
              <span>Back</span>
            </button>
          </div>

          <div className="p-4 border-b">
            <button
              onClick={saveChanges}
              disabled={saving || modifiedQuestionIds.size === 0}
              className="w-full rounded-md p-3 bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors duration-300 shadow-md flex items-center justify-center gap-2 disabled:bg-violet-400"
            >
              {saving ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>
                    Save Changes
                    {modifiedQuestionIds.size > 0 &&
                      ` (${modifiedQuestionIds.size})`}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Question cards */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="flex flex-col gap-2">
              {questions.map((question, index) => (
                <SlideCard
                  key={question.id || index}
                  index={index}
                  question={question.question}
                  options={question.options}
                  isActive={currentQuestionIndex === index}
                  isModified={
                    question.id ? isQuestionModified(question.id) : false
                  }
                  changeSlide={changeSlide}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto bg-gray-50">
          {/* Question preview */}
          <div className="bg-white m-4 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-violet-900">
                Question {currentQuestionIndex + 1} Preview
                {editedQuestion.id && isQuestionModified(editedQuestion.id) && (
                  <span className="ml-2 text-sm font-normal px-2 py-1 bg-orange-100 text-orange-600 rounded-md">
                    Modified
                  </span>
                )}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => navigateQuestion("prev")}
                  disabled={currentQuestionIndex === 0}
                  className={`p-2 rounded-full ${
                    currentQuestionIndex === 0
                      ? "text-gray-300"
                      : "text-violet-600 hover:bg-violet-50"
                  }`}
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={() => navigateQuestion("next")}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className={`p-2 rounded-full ${
                    currentQuestionIndex === questions.length - 1
                      ? "text-gray-300"
                      : "text-violet-600 hover:bg-violet-50"
                  }`}
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-medium mb-4 text-center p-3 bg-violet-50 rounded-lg text-violet-800">
              {editedQuestion.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              {editedQuestion.options.map((option, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg flex items-center ${
                    editedQuestion.answers === option
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-gray-100 border border-gray-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                      editedQuestion.answers === option
                        ? "bg-green-500 text-white"
                        : "border border-gray-400"
                    }`}
                  >
                    {editedQuestion.answers === option && (
                      <CheckCircle size={14} />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Question editor */}
          <div className="flex-1 bg-white m-4 p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold text-violet-900 mb-6 pb-2 border-b border-gray-200">
              Edit Question
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Text
                </label>
                <textarea
                  style={{ resize: "none" }}
                  value={editedQuestion.question}
                  onChange={handleQuestionChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                  rows={1}
                  placeholder="Enter your question here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Options
                </label>
                <div className="space-y-3">
                  {editedQuestion.options.map((option, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-violet-200 bg-white"
                    >
                      <button
                        onClick={() => toggleAnswerOption(idx)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          editedQuestion.answers === option
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                        title={
                          editedQuestion.answers === option
                            ? "Correct answer (click to deselect)"
                            : "Set as correct answer"
                        }
                      >
                        {editedQuestion.answers === option ? "✓" : "?"}
                      </button>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(idx, e.target.value)
                        }
                        className="flex-1 p-2 border border-gray-200 rounded-md focus:ring-violet-500 focus:border-violet-500"
                        placeholder={`Option ${idx + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Click the button next to an option to mark it as the correct
                  answer. Click again to deselect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating save button for mobile */}
      <div className="md:hidden fixed bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={saveChanges}
          disabled={saving || modifiedQuestionIds.size === 0}
          className="flex items-center justify-center p-3 bg-violet-600 text-white rounded-full shadow-lg disabled:bg-violet-400"
        >
          {saving ? (
            <Loader size={24} className="animate-spin" />
          ) : (
            <Save size={24} />
          )}
        </button>
      </div>
    </div>
  );
}

export default QuizEditor;
