"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Users,
  Target,
  X,
  TrendingUp,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";

// Mock data structure based on your paste.txt
// const mockData = [
//   {
//     id: "b610d128-8b6d-42c9-8735-04e5ed5af334",
//     userId: "dbdbaf3a-be4b-45fc-a93e-860e50c15417",
//     quizId: "cb5a5201-63f8-4110-8238-f57b783f5f98",
//     totalQuestion: 10,
//     totalAttemptedQuestion: 3,
//     totalCorrectQuestion: 2,
//     totalWrongQuestion: 1,
//     createdAt: "2025-05-22T15:04:50.261Z",
//     updatedAt: "2025-05-22T15:04:50.261Z",
//     user: {
//       name: "Palak",
//       email: "bongahai123@gmail.com",
//       id: "dbdbaf3a-be4b-45fc-a93e-860e50c15417",
//     },
//     correct: JSON.stringify([
//       {
//         question: {
//           id: "46ed2fd7-3caa-4328-bb3f-3f77b1569903",
//           question:
//             "Sorghum (Sorghum bicolor), also known as Jowar or Chary, is characterized by its palatability and extended green period. However, what is a significant limitation associated with its cultivation?",
//           options: [
//             "Extremely high water requirements",
//             "Susceptibility to HCN poisoning in animals if immature and wilted crops are fed",
//             "Inability to tolerate any level of drought",
//             "Low yield potential compared to other fodder crops",
//           ],
//           answers:
//             "Susceptibility to HCN poisoning in animals if immature and wilted crops are fed",
//         },
//         userAnswer:
//           "Susceptibility to HCN poisoning in animals if immature and wilted crops are fed",
//       },
//     ]),
//     Incorrect: JSON.stringify([
//       {
//         question: {
//           id: "49f743a6-4946-44fa-964f-a1c74db88eda",
//           question:
//             "Bajra (Pennisetum glaucum) exhibits high tillering and drought tolerance. What is a major drawback that limits its widespread use?",
//           options: [
//             "Extremely slow growth rate",
//             "High oxalic acid content",
//             "Sensitivity to even moderate rainfall",
//             "Poor adaptability to various soil types",
//           ],
//           answers: "High oxalic acid content",
//         },
//         userAnswer: "Sensitivity to even moderate rainfall",
//       },
//     ]),
//     unattempted: JSON.stringify([
//       {
//         question: {
//           id: "116bc7fa-5ba7-42d5-94c3-8a4d8045768c",
//           question:
//             "Maize (Zea mays) cultivation requires specific climatic conditions. Which of the following temperature ranges is most suitable for optimal maize growth?",
//           options: [
//             "0°C - 10°C",
//             "10°C - 45°C",
//             "25°C - 35°C",
//             "Below 10°C or above 45°C",
//           ],
//           answers: "10°C - 45°C",
//         },
//         userAnswer: "",
//       },
//     ]),
//   },
// ];

function AdminQuizPanel() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [expandedSubmissions, setExpandedSubmissions] = useState({});
  const [selectedSubmissionDetail, setSelectedSubmissionDetail] =
    useState(null);
  const router = useParams();
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/report/all-users/${router.quizid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );
        console.log(response);

        setData(response.data.data.submissions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate aggregated statistics
  const aggregatedStats = {
    totalAttempts: data.length,
    totalCorrect: data.reduce(
      (acc, item) => acc + item.totalCorrectQuestion,
      0
    ),
    totalIncorrect: data.reduce(
      (acc, item) => acc + item.totalWrongQuestion,
      0
    ),
    totalUnattempted: data.reduce(
      (acc, item) => acc + (item.totalQuestion - item.totalAttemptedQuestion),
      0
    ),
    totalQuestions: data.reduce((acc, item) => acc + item.totalQuestion, 0),
    averageScore:
      data.length > 0
        ? (
            data.reduce(
              (acc, item) =>
                acc + (item.totalCorrectQuestion / item.totalQuestion) * 100,
              0
            ) / data.length
          ).toFixed(1)
        : 0,
  };

  // Filter users based on search term
  const filteredUsers = data.filter(
    (item) =>
      item.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group submissions by user
  const groupedByUser = filteredUsers.reduce((acc, submission) => {
    const userId = submission.user.id;
    if (!acc[userId]) {
      acc[userId] = {
        user: submission.user,
        submissions: [],
      };
    }
    acc[userId].submissions.push(submission);
    return acc;
  }, {});

  const toggleSubmissionExpansion = (submissionId) => {
    setExpandedSubmissions((prev) => ({
      ...prev,
      [submissionId]: !prev[submissionId],
    }));
  };

  const openSubmissionDetail = (submission) => {
    setSelectedSubmissionDetail(submission);
  };

  const closeSubmissionDetail = () => {
    setSelectedSubmissionDetail(null);
  };

  const parseQuestionData = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return [];
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculatePercentage = (correct, total) => {
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 gap-[30svw]">
          <ArrowLeft
            onClick={() =>
              (window.location.href = `/subject/${router.noteid}/quiz`)
            }
            className="text-purple-800 my-auto h-9 w-9"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quiz Administration Panel
            </h1>
            <p className="text-gray-600">
              Monitor and analyze quiz performance across all users
            </p>
          </div>
        </div>
      </div>

      {/* Aggregated Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Attempts
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {aggregatedStats.totalAttempts}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Correct Answers
              </p>
              <p className="text-2xl font-bold text-green-600">
                {aggregatedStats.totalCorrect}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Incorrect Answers
              </p>
              <p className="text-2xl font-bold text-red-600">
                {aggregatedStats.totalIncorrect}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-purple-600">
                {aggregatedStats.averageScore}%
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by user name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="p-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {searchTerm && (
          <div className="mt-4 text-sm text-gray-600">
            Found {Object.keys(groupedByUser).length} user(s) with{" "}
            {filteredUsers.length} submission(s)
          </div>
        )}
      </div>

      {/* User Results */}
      {Object.keys(groupedByUser).length > 0 ? (
        <div className="space-y-6">
          {Object.values(groupedByUser).map((userGroup) => (
            <div
              key={userGroup?.user?.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              {/* User Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <User className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {userGroup.user.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>{userGroup.user.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{userGroup.submissions.length} attempt(s)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Stats Summary */}
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Best Score</p>
                      <p className="text-lg font-bold text-green-600">
                        {Math.max(
                          ...userGroup.submissions.map((s) =>
                            calculatePercentage(
                              s.totalCorrectQuestion,
                              s.totalQuestion
                            )
                          )
                        )}
                        %
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Avg Score</p>
                      <p className="text-lg font-bold text-blue-600">
                        {(
                          userGroup.submissions.reduce(
                            (acc, s) =>
                              acc +
                              calculatePercentage(
                                s.totalCorrectQuestion,
                                s.totalQuestion
                              ),
                            0
                          ) / userGroup.submissions.length
                        ).toFixed(1)}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submissions List */}
              <div className="divide-y divide-gray-100">
                {userGroup.submissions.map((submission, index) => (
                  <div key={submission.id}>
                    <div
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => toggleSubmissionExpansion(submission.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`flex items-center space-x-1 ${expandedSubmissions[submission.id] ? "text-purple-600" : "text-gray-400"}`}
                          >
                            {expandedSubmissions[submission.id] ? (
                              <ChevronDown className="h-5 w-5" />
                            ) : (
                              <ChevronRight className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Attempt #{index + 1}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(submission.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="grid grid-cols-4 gap-4 text-center">
                            <div>
                              <p className="text-xs text-gray-600">Score</p>
                              <p className="font-bold text-purple-600">
                                {calculatePercentage(
                                  submission.totalCorrectQuestion,
                                  submission.totalQuestion
                                )}
                                %
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-green-600">Correct</p>
                              <p className="font-bold text-green-600">
                                {submission.totalCorrectQuestion}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-red-600">Wrong</p>
                              <p className="font-bold text-red-600">
                                {submission.totalWrongQuestion}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Skipped</p>
                              <p className="font-bold text-gray-600">
                                {submission.totalQuestion -
                                  submission.totalAttemptedQuestion}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Submission Details */}
                    {expandedSubmissions[submission.id] && (
                      <div className="px-6 pb-6 bg-gray-50">
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-900">
                              Detailed Performance
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openSubmissionDetail(submission);
                              }}
                              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                            >
                              View Full Review
                            </button>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>
                                Progress: {submission.totalAttemptedQuestion}/
                                {submission.totalQuestion} questions
                              </span>
                              <span>
                                {calculatePercentage(
                                  submission.totalAttemptedQuestion,
                                  submission.totalQuestion
                                )}
                                % completed
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${calculatePercentage(submission.totalAttemptedQuestion, submission.totalQuestion)}%`,
                                }}
                              />
                            </div>
                          </div>

                          {/* Quick Stats */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-green-50 p-3 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium text-green-800">
                                  {submission.totalCorrectQuestion} Correct
                                </span>
                              </div>
                            </div>
                            <div className="bg-red-50 p-3 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <XCircle className="h-4 w-4 text-red-600" />
                                <span className="text-sm font-medium text-red-800">
                                  {submission.totalWrongQuestion} Wrong
                                </span>
                              </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-800">
                                  {submission.totalQuestion -
                                    submission.totalAttemptedQuestion}{" "}
                                  Skipped
                                </span>
                              </div>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <BarChart3 className="h-4 w-4 text-purple-600" />
                                <span className="text-sm font-medium text-purple-800">
                                  {calculatePercentage(
                                    submission.totalCorrectQuestion,
                                    submission.totalQuestion
                                  )}
                                  % Score
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No users found
          </h3>
          <p className="text-gray-600">
            {searchTerm
              ? "Try adjusting your search terms"
              : "No quiz submissions available"}
          </p>
        </div>
      )}

      {/* Detailed Submission Modal */}
      {selectedSubmissionDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-full overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Detailed Quiz Review - {selectedSubmissionDetail.user.name}
                </h2>
                <p className="text-gray-600">
                  Submitted on {formatDate(selectedSubmissionDetail.createdAt)}
                </p>
              </div>
              <button
                onClick={closeSubmissionDetail}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-96 p-6">
              {/* Score Summary */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {calculatePercentage(
                        selectedSubmissionDetail.totalCorrectQuestion,
                        selectedSubmissionDetail.totalQuestion
                      )}
                      %
                    </p>
                    <p className="text-sm text-gray-600">Final Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {selectedSubmissionDetail.totalCorrectQuestion}
                    </p>
                    <p className="text-sm text-gray-600">Correct</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">
                      {selectedSubmissionDetail.totalWrongQuestion}
                    </p>
                    <p className="text-sm text-gray-600">Incorrect</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-600">
                      {selectedSubmissionDetail.totalQuestion -
                        selectedSubmissionDetail.totalAttemptedQuestion}
                    </p>
                    <p className="text-sm text-gray-600">Unattempted</p>
                  </div>
                </div>
              </div>

              {/* Questions Review */}
              <div className="space-y-6">
                {/* Correct Answers */}
                {parseQuestionData(selectedSubmissionDetail.correct).length >
                  0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Correct Answers (
                      {
                        parseQuestionData(selectedSubmissionDetail.correct)
                          .length
                      }
                      )
                    </h3>
                    <div className="space-y-4">
                      {parseQuestionData(selectedSubmissionDetail.correct).map(
                        (item, index) => (
                          <div
                            key={index}
                            className="bg-green-50 border border-green-200 rounded-lg p-4"
                          >
                            <p className="font-medium text-gray-900 mb-2">
                              {item.question.question}
                            </p>
                            <div className="bg-green-100 p-3 rounded-lg">
                              <p className="text-green-800 font-medium">
                                ✓ {item.userAnswer}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Incorrect Answers */}
                {parseQuestionData(selectedSubmissionDetail.Incorrect).length >
                  0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                      <XCircle className="h-5 w-5 mr-2" />
                      Incorrect Answers (
                      {
                        parseQuestionData(selectedSubmissionDetail.Incorrect)
                          .length
                      }
                      )
                    </h3>
                    <div className="space-y-4">
                      {parseQuestionData(
                        selectedSubmissionDetail.Incorrect
                      ).map((item, index) => (
                        <div
                          key={index}
                          className="bg-red-50 border border-red-200 rounded-lg p-4"
                        >
                          <p className="font-medium text-gray-900 mb-3">
                            {item.question.question}
                          </p>
                          <div className="space-y-2">
                            <div className="bg-red-100 p-3 rounded-lg">
                              <p className="text-red-800">
                                <span className="font-medium">
                                  Your Answer:
                                </span>{" "}
                                ✗ {item.userAnswer}
                              </p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg">
                              <p className="text-green-800">
                                <span className="font-medium">
                                  Correct Answer:
                                </span>{" "}
                                ✓ {item.question.answers}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Unattempted Questions */}
                {parseQuestionData(selectedSubmissionDetail.unattempted)
                  .length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Unattempted Questions (
                      {
                        parseQuestionData(selectedSubmissionDetail.unattempted)
                          .length
                      }
                      )
                    </h3>
                    <div className="space-y-4">
                      {parseQuestionData(
                        selectedSubmissionDetail.unattempted
                      ).map((item, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                        >
                          <p className="font-medium text-gray-900 mb-2">
                            {item.question.question}
                          </p>
                          <div className="bg-gray-100 p-3 rounded-lg">
                            <p className="text-gray-600">Not attempted</p>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg mt-2">
                            <p className="text-blue-800">
                              <span className="font-medium">
                                Correct Answer:
                              </span>{" "}
                              {item.question.answers}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminQuizPanel;
