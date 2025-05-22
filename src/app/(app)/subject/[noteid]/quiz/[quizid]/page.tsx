"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  PieChart,
  Flag,
  X,
  Home,
} from "lucide-react";
import QuestionCardOption from "@/components/general/EnhancedCard";

function Page() {
  const params = useParams();
  const [notes, setNotes] = useState({});
  // Default to SCQ mode only
  const [quizMode, setQuizMode] = useState("SCQ");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [singleCorrect, setSingleCorrect] = useState([]);
  const [multiCorrect, setMultiCorrect] = useState([]);
  const [userGeneratedSCQResult, setUserGeneratedSCQResult] = useState([]);
  const [userGeneratedMCQResult, setUserGeneratedMCQResult] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [quizStats, setQuizStats] = useState({
    correct: 0,
    incorrect: 0,
    unattempted: 0,
    attempted: 0,
  });
  console.log(setMultiCorrect);

  // Initialize user answers when questions are loaded
  useEffect(() => {
    if (singleCorrect.length > 0 && userGeneratedSCQResult.length === 0) {
      // console.log("Quiz data fetched:", singleCorrect);
      setUserGeneratedSCQResult(Array(singleCorrect.length).fill(""));
      setMarkedForReview(Array(singleCorrect.length).fill(false));
    }

    if (multiCorrect.length > 0 && userGeneratedMCQResult.length === 0) {
      // For MCQs, we need arrays for each question to track multiple selections
      const multiCorrectArray = Array.from(
        { length: multiCorrect.length },
        () => []
      );
      setUserGeneratedMCQResult(multiCorrectArray);
    }
  }, [
    singleCorrect,
    multiCorrect,
    userGeneratedSCQResult.length,
    userGeneratedMCQResult.length,
  ]);

  useEffect(() => {
    const fetchData = async () => {
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
          console.log(res.data.data);

          setNotes(res.data.data.notes);
          setSingleCorrect([...res.data.data.dbQuestions]);
        } catch (error) {
          console.error("Error fetching quiz data:", error);
        }
      }
    };

    fetchData();
  }, [params.quizid]);

  const moveToNext = () => {
    if (currentQuestionIndex < singleCorrect.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const moveBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSCQSelection = (selectedOption) => {
    if (isSubmitted) return;

    const newResults = [...userGeneratedSCQResult];
    newResults[currentQuestionIndex] = selectedOption;
    setUserGeneratedSCQResult(newResults);
  };

  const toggleMarkForReview = () => {
    if (isSubmitted) return;

    const newMarkedForReview = [...markedForReview];
    newMarkedForReview[currentQuestionIndex] =
      !newMarkedForReview[currentQuestionIndex];
    setMarkedForReview(newMarkedForReview);
  };

  const directBack = () => {
    console.log(notes);
    console.log(setQuizMode("SCQ"));
    window.location.href = `/subject/${params.noteid}/quiz`;
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    // Calculate SCQ results
    singleCorrect.forEach((q, index) => {
      if (userGeneratedSCQResult[index] === "") {
        unattempted++;
      } else if (userGeneratedSCQResult[index] === q.answers) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return { correct, incorrect, unattempted };
  };

  const initiateSubmit = () => {
    // Calculate attempted/unattempted for confirmation dialog
    const attempted = userGeneratedSCQResult.filter(
      (answer) => answer !== ""
    ).length;
    const unattempted = singleCorrect.length - attempted;

    // Set confirmation dialog data
    setQuizStats({
      ...quizStats,
      attempted,
      unattempted,
    });

    // Show confirmation dialog
    setShowConfirmation(true);
  };

  const cancelSubmit = () => {
    setShowConfirmation(false);
  };

  const submitQuiz = async () => {
    const results = calculateResults();
    //make a submission request
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/interaction/submit-quiz/${params.quizid}`,
        {
          totalQuestion:
            results.correct + results.incorrect + results.unattempted,
          totalCorrectQuestion: results.correct,
          totalWrongQuestion: results.incorrect,
          totalAttemptedQuestion: results.correct + results.incorrect,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      console.log(response.data.data);

      setQuizStats({
        ...results,
        attempted: results.correct + results.incorrect,
      });
      setIsSubmitted(true);
      setShowResults(true);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setShowConfirmation(false);
      // You might want to show an error message here
    }
  };

  const closeQuiz = () => {
    // Navigate back to home screen
    window.location.href = `/subject/${params.noteid}/quiz`;
  };

  const isOptionSelected = (option) => {
    if (quizMode === "SCQ") {
      return userGeneratedSCQResult[currentQuestionIndex] === option;
    } else {
      return (
        userGeneratedMCQResult[currentQuestionIndex]?.includes(option) || false
      );
    }
  };

  const isCorrectAnswer = (option) => {
    if (!isSubmitted) return false;

    if (quizMode === "SCQ") {
      return singleCorrect[currentQuestionIndex]?.answers === option;
    } else {
      return multiCorrect[currentQuestionIndex]?.answers.includes(option);
    }
  };

  const getQuestionStatusClass = (index) => {
    // If not submitted yet
    if (!isSubmitted) {
      if (markedForReview[index]) {
        return userGeneratedSCQResult[index] !== ""
          ? "bg-yellow-100 border-yellow-400"
          : "bg-yellow-50 border-yellow-300";
      }
      return userGeneratedSCQResult[index] !== ""
        ? "bg-violet-100 border-violet-400"
        : "bg-gray-100 border-gray-200";
    }
    // After submission
    else {
      // Unattempted
      if (userGeneratedSCQResult[index] === "")
        return "bg-gray-100 border-gray-400";

      // Correct or incorrect
      return userGeneratedSCQResult[index] === singleCorrect[index]?.answers
        ? "bg-green-100 border-green-500"
        : "bg-red-100 border-red-500";
    }
  };

  const getButtonClass = (option) => {
    // Base classes
    const baseClasses =
      "text-left w-full p-4 rounded-lg shadow-md transition-all";

    // Not submitted yet
    if (!isSubmitted) {
      if (isOptionSelected(option)) {
        return `${baseClasses} bg-blue-100 border-2 border-blue-500 text-blue-800`;
      }
      return `${baseClasses} bg-white border hover:border-blue-300 hover:bg-blue-50`;
    }

    // After submission
    if (isCorrectAnswer(option)) {
      return `${baseClasses} bg-green-100 border-2 border-green-500 text-green-800`;
    }

    if (isOptionSelected(option) && !isCorrectAnswer(option)) {
      return `${baseClasses} bg-red-100 border-2 border-red-500 text-red-800`;
    }

    return `${baseClasses} bg-white border opacity-70`;
  };

  // Calculate total questions
  const totalQuestions = singleCorrect.length;

  // Calculate percentages for results visualization
  const calculatePercentage = (value) => {
    return totalQuestions > 0 ? Math.round((value / totalQuestions) * 100) : 0;
  };

  // Get question status for the legend
  const getQuestionStats = () => {
    const attempted = userGeneratedSCQResult.filter(
      (answer) => answer !== ""
    ).length;
    const markedCount = markedForReview.filter((marked) => marked).length;

    return {
      attempted,
      unattempted: totalQuestions - attempted,
      markedForReview: markedCount,
    };
  };
  console.log(getQuestionStats);

  // Get status for the current question
  const getCurrentQuestionStatus = () => {
    const isAttempted = userGeneratedSCQResult[currentQuestionIndex] !== "";
    const isMarked = markedForReview[currentQuestionIndex];

    if (isMarked) return "Marked for review";
    if (isAttempted) return "Answered";
    return "Not answered";
  };

  return (
    <div className="relative flex gap-1 md:gap-4 h-screen w-full bg-gray-50">
      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-20">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Submit Quiz?
            </h2>
            <p className="text-gray-600 mb-4">
              You are about to submit your quiz. Once submitted, you cannot
              change your answers.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-violet-50 p-3 rounded-lg text-center">
                <p className="text-violet-800 font-bold text-xl">
                  {quizStats?.attempted || 0}
                </p>
                <p className="text-violet-600">Attempted</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-gray-800 font-bold text-xl">
                  {quizStats.unattempted || 0}
                </p>
                <p className="text-gray-600">Unattempted</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelSubmit}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitQuiz}
                className="px-4 py-2 bg-[#4E0684] text-white rounded-lg hover:bg-[#3D0568]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-2/3 p-4 flex flex-col">
        {showResults && (
          <div className="absolute bg-black/50 inset-0 z-10 flex items-center justify-center">
            <div className="absolute bg-white rounded-xl shadow-xl p-6 mb-6 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Quiz Results
              </h2>

              {/* Simple Results Display */}
              <div className="w-full max-w-md mb-6">
                <div className="w-full bg-gray-200 rounded-full h-8 mb-4">
                  <div
                    className="bg-green-500 h-8 rounded-l-full flex items-center justify-center text-white font-medium"
                    style={{
                      width: `${calculatePercentage(quizStats.correct)}%`,
                    }}
                  >
                    {calculatePercentage(quizStats.correct)}%
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full">
                  <div className="bg-green-100 p-3 rounded-lg text-center">
                    <p className="text-green-800 font-bold text-xl">
                      {quizStats.correct}
                    </p>
                    <p className="text-green-600">Correct</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg text-center">
                    <p className="text-red-800 font-bold text-xl">
                      {quizStats.incorrect}
                    </p>
                    <p className="text-red-600">Incorrect</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <p className="text-gray-800 font-bold text-xl">
                      {quizStats.unattempted}
                    </p>
                    <p className="text-gray-600">Unattempted</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={closeQuiz}
                  className="mt-4 bg-gray-700 text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Close Quiz
                </button>
                <button
                  onClick={() => setShowResults(false)}
                  className="mt-4 bg-violet-600 text-white py-2 px-6 rounded-lg hover:bg-[#4E0684] transition-colors"
                >
                  Continue Reviewing
                </button>
              </div>
            </div>
          </div>
        )}

        {!showResults && (
          <div className="flex-1 bg-white rounded-xl shadow-xl p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-gray-100 text-[#4E0684] px-3 py-1 rounded-full text-sm font-medium">
                  <span className="hidden md:inline">Question</span>{" "}
                  {currentQuestionIndex + 1} of {singleCorrect.length}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    markedForReview[currentQuestionIndex]
                      ? "bg-yellow-100 text-yellow-800"
                      : userGeneratedSCQResult[currentQuestionIndex] !== ""
                        ? "bg-violet-100 text-violet-800"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {getCurrentQuestionStatus()}
                </span>
              </div>
              <span className="bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium">
                Single Choice
              </span>
            </div>

            {singleCorrect[currentQuestionIndex] && (
              <>
                <h1 className="text-xl font-bold mb-6 text-gray-800">
                  {singleCorrect[currentQuestionIndex].question}
                </h1>
                <div className="flex flex-col gap-3 mt-4">
                  {singleCorrect[currentQuestionIndex].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSCQSelection(option)}
                      disabled={isSubmitted}
                      className={getButtonClass(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}

            {!isSubmitted && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={toggleMarkForReview}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${
                    markedForReview[currentQuestionIndex]
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Flag
                    className={`h-4 w-4 mr-2 ${
                      markedForReview[currentQuestionIndex]
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`}
                  />
                  {markedForReview[currentQuestionIndex]
                    ? "Marked for Review"
                    : "Mark for Review"}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={moveBack}
            className="flex items-center justify-center p-3 rounded-lg border bg-white shadow-md hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="mr-2" />
            <p className="hidden md:block">Previous</p>
          </button>

          {!isSubmitted ? (
            <button
              onClick={initiateSubmit}
              className="flex items-center justify-center p-3 rounded-lg bg-[#4E0684]/80 text-white shadow-md hover:bg-[#4E0684] transition-colors"
            >
              <CheckCircle className="mr-2" />
              <p>Submit Quiz</p>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setShowResults(!showResults)}
                className="flex items-center justify-center p-3 rounded-lg bg-purple-600 text-white shadow-md hover:bg-[#4E0684]/80 transition-colors"
              >
                <PieChart className="mr-2" />
                <p>{showResults ? "Hide Results" : "Show Results"}</p>
              </button>
              <button
                onClick={closeQuiz}
                className="flex items-center justify-center p-3 rounded-lg bg-gray-700 text-white shadow-md hover:bg-gray-800 transition-colors"
              >
                <X className="mr-2" />
                <p>Close Quiz</p>
              </button>
            </div>
          )}

          <button
            onClick={moveToNext}
            className="flex items-center justify-center p-3 rounded-lg border bg-white shadow-md hover:bg-gray-50 transition-colors"
          >
            <p className="hidden md:block">Next</p>
            <ArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      <div className="w-2/5 bg-gradient-to-b from-indigo-50 to-purple-50 flex flex-col p-4 rounded-l-xl">
        <div className="flex w-[65%]  justify-between">
          <ArrowLeft onClick={directBack} className="w-7 h-7 my-auto" />
          <h1 className="text-center mt-4 text-lg md:text-2xl font-bold mb-4 text-[#4E0684]">
            Quiz Navigator
          </h1>
        </div>

        {/* Only show SCQ tab for now */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <button className="px-4 py-2 rounded-full font-medium transition-colors bg-violet-600 text-white">
            Single Choice
          </button>
        </div>

        {/* Question status legend */}
        <div className="bg-white rounded-lg p-3 mb-4 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Question Status
          </h3>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded bg-violet-100 border border-violet-400 mr-1"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded bg-gray-100 border border-gray-200 mr-1"></div>
              <span>Not Answered</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-400 mr-1"></div>
              <span>Marked for Review</span>
            </div>
            {isSubmitted && (
              <>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded bg-green-100 border border-green-500 mr-1"></div>
                  <span>Correct</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded bg-red-100 border border-red-500 mr-1"></div>
                  <span>Incorrect</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {singleCorrect.map((_, index) => (
              <QuestionCardOption
                key={index}
                questionData={{
                  index: index + 1,
                  attempted: userGeneratedSCQResult[index] !== "",
                  isCorrect:
                    isSubmitted &&
                    userGeneratedSCQResult[index] ===
                      singleCorrect[index]?.answers,
                  isSubmitted,
                  isMarkedForReview: markedForReview[index],
                }}
                className={getQuestionStatusClass(index)}
                onSelect={() => {
                  setCurrentQuestionIndex(index);
                }}
                isActive={currentQuestionIndex === index}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:block mt-4 bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Quiz Progress
            </h2>
            {isSubmitted && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Completed
              </span>
            )}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className=" bg-violet-600 h-2.5 rounded-full"
              style={{
                width: `${
                  (userGeneratedSCQResult.filter((r) => r !== "").length /
                    singleCorrect.length) *
                  100
                }%`,
              }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Attempted:</span>
                <span className="font-medium">
                  {userGeneratedSCQResult.filter((r) => r !== "").length}
                </span>
              </div>
              <div className="flex justify-between mt-1 text-sm text-gray-600">
                <span>Unattempted:</span>
                <span className="font-medium">
                  {singleCorrect.length -
                    userGeneratedSCQResult.filter((r) => r !== "").length}
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Total Questions:</span>
                <span className="font-medium">{singleCorrect.length}</span>
              </div>
              <div className="flex justify-between mt-1 text-sm text-gray-600">
                <span>Marked for Review:</span>
                <span className="font-medium">
                  {markedForReview.filter((m) => m).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
