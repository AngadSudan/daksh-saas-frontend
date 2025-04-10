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
  Target,
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
  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <h1 className="text-3xl flex gap-2 font-bold mb-8">
        <Image src={logo} alt="logo" className="w-20 h-20 object-contain" />
        <span className="my-auto">Dashboard</span>
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-500">
            Loading dashboard data...
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pinned Todos Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Pin className="h-5 w-5 text-blue-500 mr-2" />
                  <h2 className="text-xl font-semibold">Pinned Todos</h2>
                </div>
                <a
                  href="/todo"
                  className="text-blue-500 hover:text-blue-700 flex items-center text-sm"
                >
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
              {todos.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
                  No pinned todos found. Pin important tasks to see them here.
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

            {/* Insights Section - Improved */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-blue-500 mr-2" />
                  <h2 className="text-xl font-semibold">Your Insights</h2>
                </div>
              </div>

              {/* Insights Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-medium">Todo Status</h3>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Todos:</span>
                    <span className="font-semibold">{insights.AllTodos}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Completed:</span>
                    <span className="font-semibold">
                      {insights.CompletedTodos}
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-blue-100">
                    <div className="bg-blue-100 rounded-full h-2 w-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: `${
                            insights.AllTodos > 0
                              ? (insights.CompletedTodos / insights.AllTodos) *
                                100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-[#5C0C99]/80 mr-2" />
                    <h3 className="font-medium">Communities</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Communities:</span>
                    <span className="font-semibold text-lg">
                      {insights.totalCommunities}
                    </span>
                  </div>
                  <div className="mt-3">
                    <Link
                      href="/community"
                      className="text-[#5C0C99] hover:text-[#5C0C99]/80 text-sm flex items-center"
                    >
                      Browse Communities <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Urgent Deadline Tasks */}
              <div className="mt-4p-3">
                <div className="flex items-center mb-3">
                  <Clock className="h-5 w-5 text-red-500 mr-2" />
                  <h3 className="font-semibold">Urgent Deadline Tasks</h3>
                </div>

                {insights.deadlineTodo && insights.deadlineTodo.length > 0 ? (
                  <div className="space-y-3">
                    {insights.deadlineTodo.map((todo) => (
                      <TodoCard
                        key={todo.id}
                        todo={todo}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                    No urgent deadline tasks at the moment.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Communities Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-[#5C0C99]/80 mr-2" />
                  <h2 className="text-xl font-semibold">Your Communities</h2>
                </div>
                <Link
                  href="/community"
                  className="text-[#5C0C99] hover:text-[#5C0C99]/80 flex items-center text-sm"
                >
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {communities.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
                  You aren&apos;t part of any communities yet. Join communities
                  to collaborate.
                </div>
              ) : (
                <div className="space-y-4">
                  {communities.map((community) => (
                    <CommunityCard key={community.id} community={community} />
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  href="/community"
                  className="block w-full py-2 px-4 hover:bg-gray-100 text-[#5C0C99] text-center rounded-md transition-colors"
                >
                  Create New Community
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
