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
        y: -5,
        boxShadow:
          "0 15px 30px -5px rgba(79, 70, 229, 0.1), 0 10px 15px -5px rgba(79, 70, 229, 0.04)",
      }}
      transition={{ duration: 0.3 }}
      className="w-full mx-auto max-w-md rounded-xl overflow-hidden shadow-md border border-gray-100 bg-white hover:border-indigo-200"
      onClick={navigateToCommunity}
      style={{ cursor: "pointer" }}
    >
      {/* Top accent gradient */}
      <div className="h-2 w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600" />

      <div className="p-6">
        {/* Header section with improved layout */}
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-lg shadow-sm">
            <Users className="h-6 w-6 text-white" />
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

        {/* Description with improved container */}
        <div className="mt-1 line-clamp-1 text-gray-600 text-sm leading-relaxed p-4 rounded-lg border border-gray-100">
          <p>{community.description || "No description available"}</p>
        </div>

        {/* Website URL with improved styling */}
        {/* {community.websiteUrl && (
          <motion.a
            href={community.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center text-sm text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 p-3 rounded-lg transition-colors border border-indigo-100"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.01 }}
          >
            <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate flex-1">{community.websiteUrl}</span>
            <ExternalLink className="w-3 h-3 ml-2 flex-shrink-0" />
          </motion.a>
        )} */}

        {/* Footer section with updated date and action button */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ x: 3 }}
              className="text-indigo-600 font-medium text-sm flex items-center group bg-indigo-50 py-2 px-4 rounded-lg"
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

            <span className="text-xs text-gray-500 bg-gray-50 py-1 px-2 rounded-md">
              Updated {formatDate(community.updatedAt)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityCard;
