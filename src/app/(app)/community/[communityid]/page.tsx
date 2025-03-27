"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Book,
  FileText,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";

function CommunitySubjectsPage() {
  const router = useParams();
  const [communityName, setCommunityName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/communities/${router.communityid}/subjects`,
          { withCredentials: true }
        );
        setSubjects(response.data.data.subjects);
        setCommunityName(response.data.data.name);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
        setError(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [router.communityid]);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedChapter(null);
  };

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-[#480179]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50">
        <h2 className="text-2xl text-red-600">Failed to load subjects</h2>
        <p className="text-red-500 mt-2">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-80 bg-gray-50 border-r overflow-y-auto">
        <div className="p-6 border-b flex gap-24">
          <ArrowLeft
            onClick={() => (window.location.href = "/community")}
            className="w-6 h-6 text-gray-400"
          />
          <h2 className="text-2xl font-bold text-gray-800">{communityName}</h2>
        </div>

        <div className="py-4">
          {/* <h1>{communityName}</h1> */}
          {subjects.map((subject) => (
            <div key={subject.id} className="mb-2">
              <div
                onClick={() => handleSubjectSelect(subject)}
                className={`px-6 py-3 cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors ${
                  selectedSubject?.id === subject.id
                    ? "bg-[#480179]/10 text-[#480179]"
                    : "text-gray-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Book className="w-5 h-5" />
                  <span className="font-medium">{subject.name}</span>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>

              {/* Chapters Dropdown */}
              {selectedSubject?.id === subject.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="pl-8 py-2 space-y-2"
                >
                  {subject.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      onClick={() => handleChapterSelect(chapter)}
                      className={`px-4 py-2 cursor-pointer rounded-md hover:bg-gray-100 transition-colors ${
                        selectedChapter?.id === chapter.id
                          ? "bg-[#480179]/10 text-[#480179]"
                          : "text-gray-600"
                      }`}
                    >
                      {chapter.name}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white p-8 overflow-y-auto">
        {!selectedChapter ? (
          <div className="h-full flex flex-col justify-center items-center text-center">
            <FileText className="w-24 h-24 text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              Choose a Chapter to Study
            </h2>
            <p className="text-gray-500 max-w-md">
              Select a subject and chapter from the sidebar to view its contents
              and start your learning journey.
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              {selectedChapter.name}
            </h1>
            {/* Load chapter-specific content here */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                Chapter content will be loaded dynamically based on the selected
                chapter. This is a placeholder for the actual chapter notes or
                learning materials.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunitySubjectsPage;
