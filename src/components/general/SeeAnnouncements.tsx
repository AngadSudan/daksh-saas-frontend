import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Megaphone, Clock, AlertCircle, Loader } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

function SeeAnnouncements({ setOnOpen, chapterId, creator }) {
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const handleCreation = async () => {
    if (!newAnnouncement.trim()) {
      toast.error("Please enter an announcement");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/interaction/create-interaction`,
        { message: newAnnouncement, chapterId, messageType: "ANNOUNCEMENT" },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      console.log(response.data);

      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        setNewAnnouncement("");

        // Add the new announcement to the list
        const newAnnouncementData = response.data.data || {
          id: new Date().getTime().toString(),
          message: newAnnouncement,
          createdAt: new Date().toISOString(),
          messageType: "ANNOUNCEMENT",
        };

        setAnnouncements((prev) => [newAnnouncementData, ...prev]);
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error("Error creating announcement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/interaction/get-interactions/${chapterId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );
        console.log(response.data);

        // Filter only announcement type messages
        const announcementsData = response.data.data.filter(
          (item) => item.messageType === "ANNOUNCEMENT"
        );

        setAnnouncements(announcementsData);
      } catch (error) {
        console.error("Error loading announcements:", error);
        toast.error("Failed to load announcements");
      } finally {
        setIsLoadingData(false);
      }
    };
    loadData();
  }, [chapterId]);

  // Format date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

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
          className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8 relative"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setOnOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>

          <div className="flex items-center justify-center mb-6">
            <Megaphone className="text-violet-600 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Announcements
            </h2>
          </div>

          {/* Input for new announcement */}
          {creator && (
            <div className="mb-6 relative">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Create new announcement..."
                  value={newAnnouncement}
                  onChange={(e) => setNewAnnouncement(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  disabled={loading}
                />
                <button
                  onClick={handleCreation}
                  disabled={loading}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-4 rounded-r-lg flex items-center justify-center transition-colors"
                >
                  {loading ? (
                    <Loader className="animate-spin" size={20} />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Announcements List */}
          <div className="bg-gray-50 rounded-xl h-[350px] overflow-y-auto">
            {isLoadingData ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader
                  className="animate-spin text-violet-500 mb-2"
                  size={24}
                />
                <p className="text-gray-500">Loading announcements...</p>
              </div>
            ) : announcements.length > 0 ? (
              <div className="p-4 space-y-4">
                {announcements.map((announcement) => (
                  <AnnouncementCard
                    key={announcement.id}
                    message={announcement.message}
                    createdAt={announcement.createdAt}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
                <AlertCircle className="mb-2" size={32} />
                <p>No announcements yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Create a new announcement to get started
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const AnnouncementCard = ({ message, createdAt, formatDate }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border-l-4 border-l-violet-500 border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="bg-violet-100 rounded-full p-2 mt-1">
          <Megaphone size={16} className="text-violet-600" />
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-medium mb-2 leading-relaxed">
            {message}
          </p>
          <div className="flex items-center text-gray-500 text-xs mt-2">
            <Clock size={12} className="mr-1" />
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Don't forget to import the Megaphone icon at the top of your file:
// import { Clock, Megaphone } from "lucide-react";
export default SeeAnnouncements;
