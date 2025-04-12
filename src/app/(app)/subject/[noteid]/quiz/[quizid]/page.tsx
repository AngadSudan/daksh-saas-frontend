"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle, PieChart } from "lucide-react";
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
  const [quizStats, setQuizStats] = useState({
    correct: 0,
    incorrect: 0,
    unattempted: 0,
  });

  // Initialize user answers when questions are loaded
  console.log(notes);
  console.log(setQuizMode("SCQ"));
  useEffect(() => {
    if (singleCorrect.length > 0 && userGeneratedSCQResult.length === 0) {
      console.log("Quiz data fetched:", singleCorrect);
      setUserGeneratedSCQResult(Array(singleCorrect.length).fill(""));
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
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/summary/${params.quizid}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("user")}`,
              },
            }
          );
          setNotes(res.data.data.notes);
          let quizResult = res.data.data.quiz;
          // Clean up the quiz data
          quizResult = quizResult.replaceAll("```", "'");
          quizResult = quizResult.replace("'json", "'");
          quizResult = quizResult.replaceAll("`", "'");
          quizResult = quizResult.replaceAll("'", "");
          quizResult = JSON.parse(quizResult);

          setSingleCorrect([...quizResult.quiz.single_correct]);
          setMultiCorrect([...quizResult.quiz.multiple_correct]);
        } catch (error) {
          console.error("Error fetching quiz data:", error);
        }
      }
    };

    fetchData();
  }, [params.quizid]);

  const moveToNext = () => {
    const maxIndex = singleCorrect.length - 1;

    if (currentQuestionIndex < maxIndex) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
  };

  const moveBack = () => {
    const maxIndex = singleCorrect.length - 1;

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setCurrentQuestionIndex(maxIndex);
    }
  };

  const handleSCQSelection = (selectedOption) => {
    if (isSubmitted) return;

    const newResults = [...userGeneratedSCQResult];
    newResults[currentQuestionIndex] = selectedOption;
    setUserGeneratedSCQResult(newResults);
  };

  const directBack = () => {
    window.location.href = `/subject/${params.noteid}`;
  };

  // const handleMCQSelection = (selectedOption) => {
  //   if (isSubmitted) return;

  //   const newResults = [...userGeneratedMCQResult];
  //   const currentSelections = newResults[currentQuestionIndex];

  //   // Toggle selection
  //   if (currentSelections.includes(selectedOption)) {
  //     newResults[currentQuestionIndex] = currentSelections.filter(
  //       (option) => option !== selectedOption
  //     );
  //   } else {
  //     newResults[currentQuestionIndex] = [...currentSelections, selectedOption];
  //   }

  //   setUserGeneratedMCQResult(newResults);
  // };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    // Calculate SCQ results
    singleCorrect.forEach((q, index) => {
      if (userGeneratedSCQResult[index] === "") {
        unattempted++;
      } else if (userGeneratedSCQResult[index] === q.correct_answer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    // The MCQ calculation is kept for future implementation
    // This section is ready when you decide to enable MCQs
    /*
    multiCorrect.forEach((q, index) => {
      if (userGeneratedMCQResult[index].length === 0) {
        unattempted++;
      } else {
        // Check if arrays have the same elements
        const userAnswers = [...userGeneratedMCQResult[index]].sort();
        const correctAnswers = [...q.answers].sort();

        const isCorrect =
          userAnswers.length === correctAnswers.length &&
          userAnswers.every((val, i) => val === correctAnswers[i]);

        if (isCorrect) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });
    */

    return { correct, incorrect, unattempted };
  };

  const submitQuiz = () => {
    const results = calculateResults();
    setQuizStats(results);
    setIsSubmitted(true);
    setShowResults(true);
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
      return singleCorrect[currentQuestionIndex]?.correct_answer === option;
    } else {
      return multiCorrect[currentQuestionIndex]?.answers.includes(option);
    }
  };

  const getQuestionStatusClass = (index) => {
    if (!isSubmitted) {
      return userGeneratedSCQResult[index] !== ""
        ? "bg-violet-100 border-violet-400"
        : "";
    } else {
      // After submission, show correct/incorrect
      if (userGeneratedSCQResult[index] === "")
        return "bg-gray-100 border-gray-400";
      // console.log("single correct ", singleCorrect[index]);
      return userGeneratedSCQResult[index] ===
        singleCorrect[index]?.correct_answer
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

  return (
    <div className="relative flex gap-1 md:gap-4 h-screen w-full bg-gray-50">
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

              <button
                onClick={() => setShowResults(false)}
                className="mt-4 bg-violet-600 text-white py-2 px-6 rounded-lg hover:bg-[#4E0684] transition-colors"
              >
                Continue Reviewing
              </button>
            </div>
          </div>
        )}

        {!showResults && (
          <div className="flex-1 bg-white rounded-xl shadow-xl p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-gray-100 text-[#4E0684] px-3 py-1 rounded-full text-sm font-medium">
                <span className="hidden md:block"> Question </span>{" "}
                {currentQuestionIndex + 1} of {singleCorrect.length}
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-2  rounded-full text-sm font-medium">
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
              onClick={submitQuiz}
              className="flex items-center justify-center p-3 rounded-lg bg-[#4E0684]/80 text-white shadow-md hover:bg-[#4E0684] transition-colors"
            >
              <CheckCircle className="mr-2" />
              <p>Submit Quiz</p>
            </button>
          ) : (
            <button
              onClick={() => setShowResults(!showResults)}
              className="flex items-center justify-center p-3 rounded-lg bg-purple-600 text-white shadow-md hover:bg-[#4E0684]/80 transition-colors"
            >
              <PieChart className="mr-2" />
              <p>{showResults ? "Hide Results" : "Show Results"}</p>
            </button>
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
          {/* MCQ button hidden for now - uncomment when ready to implement
          <button
            onClick={() => {
              setQuizMode("MCQ");
              setCurrentQuestionIndex(0);
            }}
            className="px-4 py-2 rounded-full font-medium transition-colors bg-white text-indigo-600 hover:bg-indigo-100"
          >
            Multiple Choice
          </button>
          */}
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
                      singleCorrect[index]?.correct_answer,
                  isSubmitted,
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

          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>
              {userGeneratedSCQResult.filter((r) => r !== "").length} of{" "}
              {singleCorrect.length}
            </span>
            <span>Questions Attempted</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
