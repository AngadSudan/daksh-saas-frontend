"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, PlusCircle, X, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import CommunityCard from "@/components/general/CommunityCard";
import { motion, AnimatePresence } from "framer-motion";
import TodoRoute from "@/components/general/TodoRoute";

function CommunitiesPage() {
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    description: "",
    websiteUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCommunity({ ...newCommunity, [name]: value });
  };

  const validateForm = () => {
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Implement your community creation logic here
        console.log("Creating community:", newCommunity);
        // Reset form and close dialog
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/communities`,
          newCommunity,
          { withCredentials: true }
        );
        console.log(response.data.data);

        // if(console.data.data)
        setNewCommunity({ name: "", description: "", websiteUrl: "" });
        setOpenDialogBox(false);
      } catch (error) {
        console.error("Failed to create community", error);
      }
    }
  };

  useEffect(() => {
    const fetchAllCommunity = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/get-user-communities`
        );
        setCommunities(response.data.data);
      } catch (error) {
        console.error("Failed to fetch communities", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCommunity();
  }, []);

  // Filter communities based on search term
  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <TodoRoute />
      <AnimatePresence>
        {openDialogBox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setOpenDialogBox(false)}
          >
            <motion.form
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setOpenDialogBox(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Create New Community
              </h2>

              {/* Community Name Input */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Community Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCommunity.name}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#480179] `}
                  placeholder="Enter community name"
                />
              </div>

              {/* Description Input */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newCommunity.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full p-3 border border-gray-300 focus:ring-[#480179] rounded-lg focus:outline-none focus:ring-2 resize-none `}
                  placeholder="Describe your community"
                />
              </div>

              {/* Website URL Input */}
              <div className="mb-6">
                <label
                  htmlFor="websiteUrl"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Website URL (Optional)
                </label>
                <input
                  type="text"
                  id="websiteUrl"
                  name="websiteUrl"
                  value={newCommunity.websiteUrl}
                  onChange={handleChange}
                  className={`w-full p-3 border border-gray-300 focus:ring-[#480179] rounded-lg focus:outline-none focus:ring-2 `}
                  placeholder="https://example.com"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onSubmit={handleSubmit}
                className="w-full bg-[#480179] text-white py-3 rounded-lg hover:bg-[#5C0C99] transition-colors flex items-center justify-center"
              >
                <Check className="mr-2" size={20} />
                Create Community
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rest of the existing component remains the same */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Communities</h1>
          <button
            onClick={() => setOpenDialogBox(true)}
            className="flex items-center bg-[#480179] text-white px-4 py-2 rounded-lg hover:bg-[#480179]/80 transition-colors"
          >
            <PlusCircle className="mr-2" size={20} />
            Create Community
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        {/* Communities Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <Skeleton key={index} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : filteredCommunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                //   className="transition-transform hover:scale-105 hover:shadow-lg"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h2 className="text-xl text-gray-600">
              {searchTerm
                ? "No communities found matching your search"
                : "You haven't joined any communities yet"}
            </h2>
            <p className="text-gray-500 mt-2">
              {searchTerm
                ? "Try a different search term"
                : "Explore and join communities that interest you"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunitiesPage;
