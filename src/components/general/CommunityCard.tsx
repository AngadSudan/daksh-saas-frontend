import React from "react";
import { Globe, Users, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const CommunityCard = ({ community }) => {
  // Format date for better readability
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        window.location.href = `/community/${community.id}`;
      }}
      className="cursor-pointer w-full max-w-xl mx-auto bg-gradient-to-br from-[#2C054A] to-[#5C0C99] rounded-3xl shadow-2xl overflow-hidden relative"
    >
      {/* Subtle glowing effect */}
      <div className="absolute inset-0 bg-purple-600/10 blur-3xl opacity-50 pointer-events-none"></div>

      <div className="p-6 bg-white/5 backdrop-blur-lg relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center shadow-inner">
              <Users className="w-10 h-10 text-white/80" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                {community.name.toUpperCase()}
              </h2>
            </div>
          </div>

          {/* Right Arrow */}
          <motion.div
            whileHover={{ x: 5 }}
            className="text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </motion.div>
        </div>

        <div className="space-y-4 mt-6 text-white/90">
          <p className="text-base leading-relaxed">
            {community.description || "No description available"}
          </p>

          {community.websiteUrl && (
            <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl">
              <Globe className="w-5 h-5 text-white/70" />
              <a
                href={community.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base hover:text-white transition-colors truncate flex-grow"
              >
                {community.websiteUrl}
              </a>
            </div>
          )}

          <div className="border-t border-white/20 pt-4 mt-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col">
                <span className="text-white/60 mb-1">Created</span>
                <span className="text-white font-medium">
                  {formatDate(community.createdAt)}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-white/60 mb-1">Last Updated</span>
                <span className="text-white font-medium">
                  {formatDate(community.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityCard;
