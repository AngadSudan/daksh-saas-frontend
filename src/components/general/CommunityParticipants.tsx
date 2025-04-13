"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { X, Search } from "lucide-react";

function CommunityParticipants({ setOnOpen }) {
  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //api call for community participants
  const router = useParams();

  useEffect(() => {
    const method = async () => {
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
    };
    method();
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
            {filteredParticipants.length > 0 ? (
              filteredParticipants.map((participant, index) => {
                return (
                  <ParticipantCard
                    key={index}
                    email={participant.user.email}
                    name={participant.user.name}
                  />
                );
              })
            ) : (
              <div className="text-center text-gray-500 py-8">
                No participants found
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const ParticipantCard = ({ email, name }) => (
  <div className="flex items-center bg-white rounded-lg shadow-md p-3 gap-3 hover:shadow-lg transition-all border border-gray-100 mb-2">
    <div className="bg-gradient-to-r from-violet-500 to-violet-600 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold">
      {name.charAt(0).toUpperCase()}
    </div>
    <div className="overflow-hidden">
      <h3 className="font-semibold text-gray-800 truncate">{name}</h3>
      <p className="text-sm text-gray-500 truncate">{email}</p>
    </div>
  </div>
);

export default CommunityParticipants;
