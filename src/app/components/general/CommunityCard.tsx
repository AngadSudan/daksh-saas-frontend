import React from "react";
import { Globe, Users } from "lucide-react";
import { defaultTo } from "lodash";

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
    <div className="w-full max-w-md mx-auto bg-gradient-to-t from-[#1A0330] to-[#480179] rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 bg-white/10 backdrop-blur-sm">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-white/70" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              {community.name}
            </h2>
          </div>
        </div>

        <div className="space-y-3 text-white/80">
          <p className="text-sm">
            {community.description || "No description available"}
          </p>

          {community.websiteUrl && (
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-white/70" />
              <a
                href={community.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-white/90 transition-colors truncate"
              >
                {community.websiteUrl}
              </a>
            </div>
          )}

          <div className="border-t border-white/20 pt-3 mt-3">
            <div className="flex justify-between text-xs">
              <span>Created</span>
              <span className="text-white/70">
                {formatDate(community.createdAt)}
              </span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Last Updated</span>
              <span className="text-white/70">
                {formatDate(community.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
