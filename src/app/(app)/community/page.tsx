"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, PlusCircle, Users, X, Check, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import CommunityCard from "@/components/general/CommunityCard";
import { motion, AnimatePresence } from "framer-motion";
import TodoRoute from "@/components/general/TodoRoute";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
function CommunitiesPage() {
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isClient, setIsClient] = useState(false); // Fix for localStorage issue
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    description: "",
  });

  const router = useRouter();

  // Ensure localStorage is only accessed on the client side
  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (!user) {
        router.push("/login");
      }
    }
  }, [router]);

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
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/communities`,
          newCommunity,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );
        if (response.data.error) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
        }
        console.log(response.data.data);
        window.location.reload();
        setNewCommunity({ name: "", description: "" });
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/get-user-communities`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );
        setCommunities(response.data.data || []);
        if (response.data.error) {
          toast.error(response.data.message);
        } else {
          toast.success("community fetched");
        }
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

  if (!isClient) return null; // Prevent rendering on the server

  return (
    <div className="h-screen relative">
      <TodoRoute />
      <Toaster />
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
                Create New Classroom
              </h2>

              {/* Community Name Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ClassRoom Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newCommunity.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#480179]"
                  placeholder="Enter classroom name"
                />
              </div>

              {/* Description Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newCommunity.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 focus:ring-[#480179] rounded-lg focus:outline-none focus:ring-2 resize-none"
                  placeholder="Describe your community"
                />
              </div>

              {/* Website URL Input */}
              {/* <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL (Optional)
                </label>
                <input
                  type="text"
                  name="websiteUrl"
                  value={newCommunity.websiteUrl}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 focus:ring-[#480179] rounded-lg focus:outline-none focus:ring-2"
                  placeholder="https://example.com"
                />
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#480179] text-white py-3 rounded-lg hover:bg-[#5C0C99] transition-colors flex items-center justify-center"
              >
                <Check className="mr-2" size={20} />
                Create ClassRoom
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <ArrowLeft
              onClick={() => router.push("/home")}
              className="w-8 h-8 object-cover text-gray-400 cursor-pointer"
            />
            <h1 className="text-3xl font-bold text-gray-800">My Classroom</h1>
          </div>
          <button
            onClick={() => setOpenDialogBox(true)}
            className="flex items-center bg-[#480179] text-white px-4 py-2 rounded-lg hover:bg-[#480179]/80 transition-colors"
          >
            <PlusCircle className="mr-2" size={20} />
            Create Classroom
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search classroom..."
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="ml-4 space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-20 w-full mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCommunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-[#480179]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No classroom found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "Try a different search term"
                : "Create your first classroom to get started"}
            </p>
            <button
              onClick={() => setOpenDialogBox(true)}
              className="flex items-center bg-[#480179] text-white px-4 py-2 rounded-lg hover:bg-[#5C0C99] transition-colors mx-auto"
            >
              <PlusCircle className="mr-2" size={20} />
              Create New classroom
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunitiesPage;
