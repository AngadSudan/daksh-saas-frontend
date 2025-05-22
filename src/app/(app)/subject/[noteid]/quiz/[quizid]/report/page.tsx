"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import axios from "axios";
import { useParams } from "next/navigation";

const QuizReportComponent = () => {
  // Sample data based on the provided object
  const [sampleData, setSampleData] = useState([]);
  const [openId, setOpenId] = useState(null);
  const router = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using the sample data you provided for demonstration
        // Replace this with your actual API call
        const mockResponse = {
          data: {
            data: {
              submissions: [
                {
                  id: "b610d128-8b6d-42c9-8735-04e5ed5af334",
                  userId: "dbdbaf3a-be4b-45fc-a93e-860e50c15417",
                  quizId: "cb5a5201-63f8-4110-8238-f57b783f5f98",
                  totalQuestion: 10,
                  totalAttemptedQuestion: 3,
                  totalCorrectQuestion: 2,
                  totalWrongQuestion: 1,
                  createdAt: "2025-05-22T15:04:50.261Z",
                  updatedAt: "2025-05-22T15:04:50.261Z",
                  correct:
                    '[{"question":{"id":"46ed2fd7-3caa-4328-bb3f-3f77b1569903","quizId":"cb5a5201-63f8-4110-8238-f57b783f5f98","question":"Sorghum (Sorghum bicolor), also known as Jowar or Chary, is characterized by its palatability and extended green period. However, what is a significant limitation associated with its cultivation?","options":["Extremely high water requirements","Susceptibility to HCN poisoning in animals if immature and wilted crops are fed","Inability to tolerate any level of drought","Low yield potential compared to other fodder crops"],"answers":"Susceptibility to HCN poisoning in animals if immature and wilted crops are fed","visibility":"VISIBLE","createdAt":"2025-05-22T04:40:22.285Z","updatedAt":"2025-05-22T04:40:22.285Z"},"userAnswer":"Susceptibility to HCN poisoning in animals if immature and wilted crops are fed"},{"question":{"id":"3283130c-be26-44f3-91c5-fae7da7017aa","quizId":"cb5a5201-63f8-4110-8238-f57b783f5f98","question":"A farmer is cultivating a multi-cut Sorghum variety (PSC-1) in a high-rainfall area.  What is the recommended fertilizer application strategy?","options":["20 kg N/acre at sowing","20 kg N + 8 kg P/acre at sowing, and an additional 20 kg N/acre one month later","40 kg N/acre immediately after the first irrigation","20 kg N/acre at sowing, and an additional 40 kg N/acre one month later"],"answers":"20 kg N + 8 kg P/acre at sowing, and an additional 20 kg N/acre one month later","visibility":"VISIBLE","createdAt":"2025-05-22T04:40:22.859Z","updatedAt":"2025-05-22T04:40:22.859Z"},"userAnswer":"20 kg N + 8 kg P/acre at sowing, and an additional 20 kg N/acre one month later"}]',
                  Incorrect:
                    '[{"question":{"id":"49f743a6-4946-44fa-964f-a1c74db88eda","quizId":"cb5a5201-63f8-4110-8238-f57b783f5f98","question":"Bajra (Pennisetum glaucum) exhibits high tillering and drought tolerance.  What is a major drawback that limits its widespread use?","options":["Extremely slow growth rate","High oxalic acid content","Sensitivity to even moderate rainfall","Poor adaptability to various soil types"],"answers":"High oxalic acid content","visibility":"VISIBLE","createdAt":"2025-05-22T04:40:23.140Z","updatedAt":"2025-05-22T04:40:23.140Z"},"userAnswer":"Sensitivity to even moderate rainfall"}]',
                  unattempted:
                    '[{"question":{"id":"116bc7fa-5ba7-42d5-94c3-8a4d8045768c","quizId":"cb5a5201-63f8-4110-8238-f57b783f5f98","question":"Maize (Zea mays) cultivation requires specific climatic conditions. Which of the following temperature ranges is most suitable for optimal maize growth?","options":["0°C - 10°C","10°C - 45°C","25°C - 35°C","Below 10°C or above 45°C"],"answers":"10°C - 45°C","visibility":"VISIBLE","createdAt":"2025-05-22T04:40:23.412Z","updatedAt":"2025-05-22T04:40:23.412Z"},"userAnswer":""}]',
                  quiz: {
                    id: "cb5a5201-63f8-4110-8238-f57b783f5f98",
                    title: "Quiz2",
                    description: "quiz2",
                    notesId: "e61fa0d7-1103-43b2-8074-8a4db4be2e48",
                    createdBy: "dbdbaf3a-be4b-45fc-a93e-860e50c15417",
                    isLive: "PUBLISHED",
                    createdAt: "2025-05-22T04:40:21.714Z",
                    updatedAt: "2025-05-22T04:42:05.423Z",
                    mode: "EASY",
                  },
                  user: {
                    name: "Palak",
                    email: "bongahai123@gmail.com",
                    id: "dbdbaf3a-be4b-45fc-a93e-860e50c15417",
                  },
                },
                {
                  id: "4ebd14c4-880a-403f-9705-31a1785a6e5c",
                  userId: "dbdbaf3a-be4b-45fc-a93e-860e50c15417",
                  quizId: "cb5a5201-63f8-4110-8238-f57b783f5f98",
                  totalQuestion: 10,
                  totalAttemptedQuestion: 10,
                  totalCorrectQuestion: 4,
                  totalWrongQuestion: 6,
                  createdAt: "2025-05-22T16:00:29.199Z",
                  updatedAt: "2025-05-22T16:00:29.199Z",
                  correct:
                    '[{"question":{"id":"46ed2fd7-3caa-4328-bb3f-3f77b1569903","quizId":"cb5a5201-63f8-4110-8238-f57b783f5f98","question":"Sorghum (Sorghum bicolor), also known as Jowar or Chary, is characterized by its palatability and extended green period. However, what is a significant limitation associated with its cultivation?","options":["Extremely high water requirements","Susceptibility to HCN poisoning in animals if immature and wilted crops are fed","Inability to tolerate any level of drought","Low yield potential compared to other fodder crops"],"answers":"Susceptibility to HCN poisoning in animals if immature and wilted crops are fed","visibility":"VISIBLE","createdAt":"2025-05-22T04:40:22.285Z","updatedAt":"2025-05-22T04:40:22.285Z"},"userAnswer":"Susceptibility to HCN poisoning in animals if immature and wilted crops are fed"}]',
                  Incorrect:
                    '[{"question":{"id":"3283130c-be26-44f3-91c5-fae7da7017aa","quizId":"cb5a5201-63f8-4110-8238-f57b783f5f98","question":"A farmer is cultivating a multi-cut Sorghum variety (PSC-1) in a high-rainfall area.  What is the recommended fertilizer application strategy?","options":["20 kg N/acre at sowing","20 kg N + 8 kg P/acre at sowing, and an additional 20 kg N/acre one month later","40 kg N/acre immediately after the first irrigation","20 kg N/acre at sowing, and an additional 40 kg N/acre one month later"],"answers":"20 kg N + 8 kg P/acre at sowing, and an additional 20 kg N/acre one month later","visibility":"VISIBLE","createdAt":"2025-05-22T04:40:22.859Z","updatedAt":"2025-05-22T04:40:22.859Z"},"userAnswer":"20 kg N/acre at sowing, and an additional 40 kg N/acre one month later"}]',
                  unattempted: "[]",
                  quiz: {
                    id: "cb5a5201-63f8-4110-8238-f57b783f5f98",
                    title: "Quiz2",
                    description: "quiz2",
                    notesId: "e61fa0d7-1103-43b2-8074-8a4db4be2e48",
                    createdBy: "dbdbaf3a-be4b-45fc-a93e-860e50c15417",
                    isLive: "PUBLISHED",
                    createdAt: "2025-05-22T04:40:21.714Z",
                    updatedAt: "2025-05-22T04:42:05.423Z",
                    mode: "EASY",
                  },
                  user: {
                    name: "Palak",
                    email: "bongahai123@gmail.com",
                    id: "dbdbaf3a-be4b-45fc-a93e-860e50c15417",
                  },
                },
              ],
            },
          },
        };

        // Replace the above mock data with your actual API call:
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/report/user/${router.quizid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );
        console.log(response.data.data.submissions);
        setSampleData(response.data.data.submissions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6 gap-[40svw]">
        <ArrowLeft
          onClick={() => window.history.back()}
          className="h-8 w-8 text-purple-800 mb-4 cursor-pointer"
        />
        <h1 className="text-3xl font-bold text-purple-800 mb-8 text-center">
          Quiz Reports
        </h1>
      </div>
      <div className="space-y-6">
        {sampleData.map((report, index) => (
          <ReportComponent
            key={report.id}
            index={index + 1}
            report={report}
            isOpen={openId === index}
            setIsOpen={() => setOpenId(openId === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

const ReportComponent = ({ report, isOpen, setIsOpen, index }) => {
  const [activeTab, setActiveTab] = useState("correct");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Parse JSON strings safely
  const parseJsonString = (jsonString) => {
    try {
      if (!jsonString || jsonString === "[]") return [];
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  };

  const correctAnswers = parseJsonString(report.correct);
  const incorrectAnswers = parseJsonString(report.Incorrect);
  const unattemptedAnswers = parseJsonString(report.unattempted);

  const chartData = [
    { name: "Correct", value: report.totalCorrectQuestion, color: "#10B981" },
    { name: "Incorrect", value: report.totalWrongQuestion, color: "#EF4444" },
    {
      name: "Unattempted",
      value: report.totalQuestion - report.totalAttemptedQuestion,
      color: "#6B7280",
    },
  ];

  const getTabData = () => {
    switch (activeTab) {
      case "correct":
        return correctAnswers;
      case "incorrect":
        return incorrectAnswers;
      case "unattempted":
        return unattemptedAnswers;
      default:
        return [];
    }
  };

  const currentQuestions = getTabData();
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prev) =>
      prev > 0 ? prev - 1 : currentQuestions.length - 1
    );
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) =>
      prev < currentQuestions.length - 1 ? prev + 1 : 0
    );
  };

  // Reset question index when tab changes
  React.useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [activeTab]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* FAQ Header */}
      <div
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={setIsOpen}
      >
        <div className="flex items-center space-x-4">
          <div className="bg-purple-100 text-violet-800 px-3 py-1 rounded-full font-semibold">
            #{index}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {report.quiz.title}
            </h3>
            <p className="text-gray-600">{formatDate(report.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Score</p>
            <p className="text-lg font-bold text-gray-800">
              {report.totalCorrectQuestion}/{report.totalQuestion}
            </p>
          </div>
          {isOpen ? (
            <ChevronUp className="h-6 w-6 text-gray-500" />
          ) : (
            <ChevronDown className="h-6 w-6 text-gray-500" />
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="border-t border-gray-200">
          {/* Stats Section with Chart */}
          <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Statistics Cards */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Quiz Statistics
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-100 p-4 rounded-lg text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-800">
                      {report.totalCorrectQuestion}
                    </p>
                    <p className="text-green-600 text-sm">Correct</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-lg text-center">
                    <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-800">
                      {report.totalWrongQuestion}
                    </p>
                    <p className="text-red-600 text-sm">Incorrect</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <Clock className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">
                      {report.totalQuestion - report.totalAttemptedQuestion}
                    </p>
                    <p className="text-gray-600 text-sm">Unattempted</p>
                  </div>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  Performance Overview
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="p-6">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              {[
                {
                  key: "correct",
                  label: "Correct Answers",
                  count: correctAnswers.length,
                  color: "green",
                },
                {
                  key: "incorrect",
                  label: "Incorrect Answers",
                  count: incorrectAnswers.length,
                  color: "red",
                },
                {
                  key: "unattempted",
                  label: "Unattempted",
                  count: unattemptedAnswers.length,
                  color: "gray",
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setCurrentQuestionIndex(0);
                  }}
                  className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? tab.color === "green"
                        ? "border-green-500 text-green-600"
                        : tab.color === "red"
                          ? "border-red-500 text-red-600"
                          : "border-gray-500 text-gray-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Question Display */}
            {currentQuestions.length > 0 ? (
              <div className="space-y-6">
                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <h5 className="text-lg font-semibold text-gray-800">
                    Question {currentQuestionIndex + 1} of{" "}
                    {currentQuestions.length}
                  </h5>
                  {currentQuestions.length > 1 && (
                    <div className="flex space-x-2">
                      <button
                        onClick={handlePrevQuestion}
                        className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </button>
                      <button
                        onClick={handleNextQuestion}
                        className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Question Content */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h6 className="text-lg font-medium text-gray-800 mb-4">
                    {currentQuestion.question.question}
                  </h6>

                  {/* Options */}
                  <div className="space-y-3 mb-6">
                    {currentQuestion.question.options.map(
                      (option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg border-2 ${
                            option === currentQuestion.question.answers
                              ? "border-green-500 bg-green-50"
                              : option === currentQuestion.userAnswer &&
                                  activeTab === "incorrect"
                                ? "border-red-500 bg-red-50"
                                : "border-gray-200 bg-white"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-700">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            <span className="text-gray-800">{option}</span>
                            {option === currentQuestion.question.answers && (
                              <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                            )}
                            {option === currentQuestion.userAnswer &&
                              activeTab === "incorrect" && (
                                <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                              )}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* Answer Summary */}
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Correct Answer:
                        </p>
                        <p className="text-green-700 font-medium">
                          {currentQuestion.question.answers}
                        </p>
                      </div>
                      {activeTab !== "unattempted" && (
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Your Answer:
                          </p>
                          <p
                            className={`font-medium ${
                              activeTab === "correct"
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {currentQuestion.userAnswer || "Not answered"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No questions in this category.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizReportComponent;
