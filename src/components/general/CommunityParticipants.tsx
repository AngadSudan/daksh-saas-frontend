"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { X, Search, Trash2, Users } from "lucide-react";

function CommunityParticipants({ setOnOpen, isAdmin }) {
  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //api call for community participants
  const router = useParams();

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/get-all-users/${router.communityid}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );

        console.log(response.data.data);
        setParticipants(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch participants:", err);
        setError("Failed to fetch participants");
        toast.error("Failed to load participants");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [router.communityid]);

  // Filter participants based on search
  const filteredParticipants = participants.filter(
    (participant) =>
      participant.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      <Toaster />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={() => setOnOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 relative"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setOnOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Existing participants
          </h2>

          {/* Search Input */}
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search participants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div
            className="bg-white h-[200px] p-5 overflow-y-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <LoadingSpinner />
                <p className="mt-3 text-gray-500">Loading participants...</p>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">
                {error}. Please try again later.
              </div>
            ) : filteredParticipants.length > 0 ? (
              filteredParticipants.map((participant, index) => (
                <ParticipantCard
                  key={index}
                  id={participant.id}
                  email={participant.user.email}
                  name={participant.user.name}
                  admin={isAdmin}
                />
              ))
            ) : searchTerm ? (
              <div className="text-center text-gray-500 py-8">
                No participants match your search
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Users size={48} className="text-gray-300 mb-3" />
                <p className="font-medium">No members yet</p>
                <p className="text-sm text-gray-400">
                  This community doesn&apos;t have any participants
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Loading spinner component
const LoadingSpinner = () => (
  <div className="relative h-12 w-12">
    <div className="absolute top-0 left-0 right-0 bottom-0">
      <div className="h-12 w-12 rounded-full border-4 border-gray-200"></div>
    </div>
    <div className="absolute top-0 left-0 right-0 bottom-0">
      <div className="h-12 w-12 rounded-full border-4 border-violet-500 border-t-transparent animate-spin"></div>
    </div>
  </div>
);

const ParticipantCard = ({ email, id, name, admin }) => {
  const router = useParams();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/communities/${router.communityid}/participants/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      if (response.data.data) {
        toast.success(response.data.message);
        window.location.reload();
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Failed to delete participant");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-3 gap-3 hover:shadow-lg transition-all border border-gray-100 mb-2">
      <div className="flex items-center gap-3 flex-grow overflow-hidden">
        <div className="bg-gradient-to-r from-violet-500 to-violet-600 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold flex-shrink-0">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="overflow-hidden">
          <h3 className="font-semibold text-gray-800 truncate">{name}</h3>
          <p className="text-sm text-gray-500 truncate">{email}</p>
        </div>
      </div>

      {admin && (
        <div className="flex-shrink-0 ml-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
            aria-label="Delete participant"
          >
            {isDeleting ? (
              <div className="h-5 w-5 border-2 border-gray-300 border-t-violet-500 rounded-full animate-spin"></div>
            ) : (
              <Trash2 className="w-5 h-5 text-gray-500 hover:text-red-500" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityParticipants;
