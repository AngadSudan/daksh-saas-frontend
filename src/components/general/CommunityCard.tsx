import React from "react";
import { Users, Globe, Calendar, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const CommunityCard = ({ community }) => {
  // Format date for better readability
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const navigateToCommunity = () => {
    window.location.href = `/community/${community.id}`;
  };

  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-md rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white hover:border-purple-100"
      onClick={navigateToCommunity}
      style={{ cursor: "pointer" }}
    >
      {/* Top accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

      <div className="p-6">
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-purple-100 to-indigo-50 p-3 rounded-xl shadow-sm">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <h2 className="font-bold text-xl text-gray-800 tracking-tight">
              {community.name}
            </h2>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              Created {formatDate(community.createdAt)}
            </p>
          </div>
        </div>

        <div className="mt-5 text-gray-600 text-sm leading-relaxed">
          <p>{community.description || "No description available"}</p>
        </div>

        {community.websiteUrl && (
          <motion.a
            href={community.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center text-sm text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 p-3 rounded-lg transition-colors"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.01 }}
          >
            <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{community.websiteUrl}</span>
            <ExternalLink className="w-3 h-3 ml-2 flex-shrink-0" />
          </motion.a>
        )}

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ x: 3 }}
              className="text-indigo-600 font-medium text-sm flex items-center group"
            >
              View Community Details
              <svg
                className="ml-1 h-5 w-5 transition-transform duration-200 transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>

            <span className="text-xs text-gray-400">
              Updated {formatDate(community.updatedAt)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityCard;
