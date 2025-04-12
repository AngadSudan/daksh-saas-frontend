"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoCard from "@/components/general/todoComponent";
import CommunityCard from "@/components/general/CommunityCard";
import {
  ArrowRight,
  Pin,
  Users,
  CheckCircle,
  Clock,
  Loader2,
  BarChart3,
  Calendar,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import { toast, Toaster } from "react-hot-toast";

const exampleInsights = {
  AllTodos: 0,
  CompletedTodos: 0,
  deadlineTodo: [],
  totalCommunities: 0,
  userCommunities: [],
};

function DashboardPage() {
  const [todos, setTodos] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [insights, setInsights] = useState(exampleInsights);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Load pinned todos
        const todosResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/get-pinned-todos`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );

        if (todosResponse.data.error) {
          toast.error(todosResponse.data.message);
          return;
        }
        setTodos(todosResponse.data.data);

        const insightResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/get-user-insights`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );
        setInsights(insightResponse.data.data);
        if (insightResponse.data.error) {
          toast.error(insightResponse.data.message);
          return;
        }

        // Load user communities
        const communitiesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/get-user-communities`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );

        if (communitiesResponse.data.error) {
          toast.error(insightResponse.data.message);
          return;
        }
        // Limit to first two communities as in original code
        if (communitiesResponse.data.data.length >= 2) {
          setCommunities([
            communitiesResponse.data.data[0],
            communitiesResponse.data.data[1],
          ]);
        } else {
          setCommunities(communitiesResponse.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
        toast.success("Dashboard data loaded successfully!");
        // console.log(insights);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (updatedTodo) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/update-todo/${updatedTodo.id}`,
        {
          title: updatedTodo.title,
          description: updatedTodo.description,
          deadline: updatedTodo.deadline,
          priority: updatedTodo.priority,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      setTodos((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todo/set-visibility-hidden/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  // Calculate completion percentage for progress bar
  const completionPercentage =
    insights.AllTodos > 0
      ? Math.round((insights.CompletedTodos / insights.AllTodos) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        {/* Header with subtle background and shadow */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <Image
              src={logo}
              alt="logo"
              className="w-[100px] h-[100px] object-contain"
            />

            <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-96 bg-white rounded-xl shadow-sm p-8">
            <div className="relative">
              <Loader2 className="h-12 w-12 text-[#5C0C99] animate-spin" />
              {/* <div className="absolute inset-0 h-12 w-12 border-4 border-t-[#5C0C99] border-purple-200 rounded-full animate-pulse opacity-70"></div> */}
            </div>
            <p className="mt-4 text-slate-600 font-medium">
              Loading your dashboard...
            </p>
            <div className="mt-6 w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#5C0C99] rounded-full animate-pulse"></div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6 text-red-700 flex items-start">
            <AlertCircle className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-red-800">Something went wrong</h3>
              <p className="mt-1">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-md transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content Column */}
            <div className="lg:col-span-8">
              {/* Pinned Todos Section */}
              <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
                <div className="border-b border-slate-100 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-violet-50 p-2 rounded-lg mr-3">
                        <Pin className="h-5 w-5 text-violet-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-slate-800">
                        Pinned Todos
                      </h2>
                    </div>
                    <Link
                      href="/todo"
                      className="flex items-center text-violet-600 hover:text-violet-800 font-medium text-sm group transition-colors"
                    >
                      View All
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  {todos.length === 0 ? (
                    <div className="bg-slate-50 rounded-lg p-8 text-center">
                      <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Pin className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="text-slate-700 font-medium mb-2">
                        No pinned todos found
                      </h3>
                      <p className="text-slate-500 text-sm mb-4">
                        Pin important tasks to see them here.
                      </p>
                      <Link
                        href="/todo"
                        className="inline-flex items-center px-4 py-2 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200 transition-colors text-sm font-medium"
                      >
                        Create a Todo
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {todos.map((todo) => (
                        <TodoCard
                          key={todo.id}
                          todo={todo}
                          onUpdate={handleUpdate}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Insights Section - Improved */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="border-b border-slate-100 p-6">
                  <div className="flex items-center">
                    <div className="bg-indigo-50 p-2 rounded-lg mr-3">
                      <BarChart3 className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800">
                      Your Insights
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  {/* Insights Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Todo Stats Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200/50 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <div className="bg-violet-500/10 p-2 rounded-lg mr-3">
                            <CheckCircle className="h-6 w-6 text-violet-600" />
                          </div>
                          <h3 className="font-semibold text-violet-900">
                            Todo Progress
                          </h3>
                        </div>
                        <span className="bg-white px-3 py-1 rounded-full text-violet-800 font-medium text-sm shadow-sm">
                          {completionPercentage}%
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white/80 p-3 rounded-lg">
                          <div className="text-xl font-bold text-slate-800">
                            {insights.AllTodos}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">
                            Total Todos
                          </div>
                        </div>
                        <div className="bg-white/80 p-3 rounded-lg">
                          <div className="text-xl font-bold text-violet-600">
                            {insights.CompletedTodos}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">
                            Completed
                          </div>
                        </div>
                      </div>

                      <div className="mt-2">
                        <div className="h-2 w-full bg-violet-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-violet-600 rounded-full transition-all duration-500"
                            style={{ width: `${completionPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Communities Card */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200/50 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-500/10 p-2 rounded-lg mr-3">
                          <Users className="h-6 w-6 text-[#5C0C99]/80" />
                        </div>
                        <h3 className="font-semibold text-purple-900">
                          Communities
                        </h3>
                      </div>

                      <div className="bg-white/80 p-4 rounded-lg mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-medium">
                            Active Communities
                          </span>
                          <span className="text-2xl font-bold text-purple-800">
                            {insights.totalCommunities}
                          </span>
                        </div>
                      </div>

                      <Link
                        href="/community"
                        className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                      >
                        Browse Communities{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Urgent Deadline Tasks */}
                  <div className="mt-2">
                    <div className="flex items-center mb-4">
                      <div className="bg-red-50 p-2 rounded-lg mr-3">
                        <Clock className="h-5 w-5 text-red-600" />
                      </div>
                      <h3 className="font-semibold text-slate-800">
                        Urgent Deadline Tasks
                      </h3>
                    </div>

                    {insights.deadlineTodo &&
                    insights.deadlineTodo.filter(
                      (todo) => todo.status !== "COMPLETED"
                    ).length === 0 ? (
                      <div className="bg-violet-50 border border-violet-100 rounded-lg p-6 text-center">
                        <div className="mx-auto w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mb-3">
                          <Calendar className="h-6 w-6 text-violet-600" />
                        </div>
                        <h3 className="text-violet-800 font-medium mb-1">
                          All Caught Up!
                        </h3>
                        <p className="text-violet-600 text-sm">
                          No urgent deadline tasks at the moment.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {insights.deadlineTodo
                          .filter((todo) => todo.status !== "COMPLETED")
                          .map((todo) => (
                            <TodoCard
                              key={todo.id}
                              todo={todo}
                              onUpdate={handleUpdate}
                              onDelete={handleDelete}
                            />
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-sm sticky top-6">
                <div className="border-b border-slate-100 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-purple-50 p-2 rounded-lg mr-3">
                        <Users className="h-5 w-5 text-[#5C0C99]/80" />
                      </div>
                      <h2 className="text-xl font-semibold text-slate-800">
                        Your Communities
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {communities.length === 0 ? (
                    <div className="bg-slate-50 rounded-lg p-6 text-center">
                      <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="text-slate-700 font-medium mb-2">
                        No Communities Yet
                      </h3>
                      <p className="text-slate-500 text-sm mb-4">
                        Join communities to collaborate with others.
                      </p>
                      <Link
                        href="/community"
                        className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
                      >
                        Explore Communities
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4 ">
                      {communities.map((community) => (
                        <CommunityCard
                          key={community.id}
                          community={community}
                        />
                      ))}

                      <Link
                        href="/community"
                        className="flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <ArrowRight className="h-5 w-5 text-purple-600" />
                          </div>
                          <span className="font-medium text-slate-700">
                            View All Communities
                          </span>
                        </div>
                      </Link>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <Link
                      href="/community"
                      className="block w-full py-3 px-4 bg-[#5C0C99] hover:bg-[#5C0C99]/90 text-white text-center rounded-lg transition-colors font-medium shadow-sm"
                    >
                      Create New Community
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
