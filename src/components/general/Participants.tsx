"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Search, UserPlus } from "lucide-react";
import axios from "axios";
import { set } from "lodash";

function Participants({ onSetAdd, communityId }) {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!email.trim()) {
      setError("Please enter an email to search");
      return;
    }

    try {
      setIsSearching(true);
      setError("");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/search-user`,
        { email },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      console.log(response.data.data);
      setUsers([response.data.data]);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search for users");
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddUser = async (user) => {
    // onAddParticipant(user);
    // /communities/:communityid/participants
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/communities/${communityId}/participants`,
      {
        userId: user.id,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    );
    console.log(response.data.data);
    setUsers(users.filter((u) => u.id !== user.id));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={() => onSetAdd(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => onSetAdd(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Add Participants
          </h2>

          {/* Email Search Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search by Email
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#480179]"
                placeholder="Enter email address"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-[#480179] text-white p-3 rounded-lg hover:bg-[#5C0C99] transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Search Results */}
          {users.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Results
              </h3>
              <div className="max-h-60 overflow-y-auto">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-gray-100 mb-2"
                  >
                    <div>
                      <p className="font-medium">
                        {user.name || user.username}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={() => handleAddUser(user)}
                      className="flex items-center text-sm bg-green-100 text-green-700 py-1 px-3 rounded-full hover:bg-green-200"
                    >
                      <UserPlus size={16} className="mr-1" />
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Added Participants will be displayed in the parent component */}

          {/* Done Button */}
          <button
            type="button"
            onClick={() => onSetAdd(false)}
            className="w-full bg-[#480179] text-white py-3 rounded-lg hover:bg-[#5C0C99] transition-colors flex items-center justify-center"
          >
            <Check className="mr-2" size={20} />
            Done
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Participants;
