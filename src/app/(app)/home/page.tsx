"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoCard from "@/components/general/todoComponent";
import CommunityCard from "@/components/general/CommunityCard";
import { ArrowRight, Pin, Users } from "lucide-react";

function DashboardPage() {
  const [todos, setTodos] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setTodos(todosResponse.data.data || []);

        // Load user communities
        const communitiesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/get-user-communities`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );

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
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

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
            <div className="bg-white rounded-lg shadow-md p-6">
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
                    <TodoCard key={todo.id} {...todo} />
                  ))}
                </div>
              )}
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
                <a
                  href="/community"
                  className="text-[#5C0C99] hover:text-[#5C0C99]/80 flex items-center text-sm"
                >
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>

              {communities.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
                  You aren't part of any communities yet. Join communities to
                  collaborate.
                </div>
              ) : (
                <div className="space-y-4">
                  {communities.map((community) => (
                    <CommunityCard key={community.id} community={community} />
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                  href="/communitiy"
                  className="block w-full py-2 px-4 hover:bg-gray-100 text-[#5C0C99] text-center rounded-md transition-colors"
                >
                  Create New Community
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
