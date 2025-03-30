import React from "react";
import { CalendarDays, FileText, ArrowRight } from "lucide-react";

const NotesCard = ({ note }) => {
  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const navigateToNote = () => {
    // Navigate to the note detail page with the note ID
    window.location.href = `/subject/${note.id}`;
  };

  return (
    <div
      className="w-full max-w-md rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer bg-white border border-gray-100"
      onClick={navigateToNote}
    >
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="bg-orange-100 p-3 rounded-full">
            <FileText className="h-5 w-5 text-orange-400" />
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-lg text-gray-800">
              {note.title}
            </h3>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <CalendarDays className="h-3 w-3 mr-1" />
              {formattedDate}
            </p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {note.description}
        </p>

        <div className="flex justify-between items-center">
          <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-md text-sm font-medium flex items-center">
            View Note
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>

          <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center">
            <span className="text-purple-800 text-xs font-medium">PDF</span>
          </div>
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-orange-300 to-purple-700" />
    </div>
  );
};

export default NotesCard;
