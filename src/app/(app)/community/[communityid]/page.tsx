"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Book,
  FileText,
  ChevronDown,
  ChevronUp,
  X,
  PlusCircle,
  ArrowLeft,
  Check,
  User,
  Upload,
  Folder,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NotesCard from "@/components/general/NotesCard";
import TodoRoute from "@/components/general/TodoRoute";
// import { Skeleton } from "@/components/ui/skeleton";
import NotesForm from "@/components/general/NotesForm";
import Participants from "@/components/general/Participants";
import { toast, Toaster } from "react-hot-toast";
function CommunitySubjectsPage() {
  const router = useParams();
  const [communityName, setCommunityName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSubject, setNewSubject] = useState(false);
  const [Notes, setNotes] = useState([]);
  const [newChapter, setNewChapter] = useState(false);
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [subjectform, setSubjectForm] = useState({
    name: "",
  });
  const [addParticipant, setAddParticipant] = useState(false);
  const [chapterform, setChapterform] = useState({
    name: "",
  });
  const [notesUpload, setNotesUpload] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/communities/${router.communityid}/subjects`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject((prev) => (prev?.id === subject.id ? null : subject));
    setExpandedSubjects((prev) => ({
      ...prev,
      [subject.id]: !prev[subject.id],
    }));
    if (selectedSubject?.id !== subject.id) {
      setSelectedChapter(null);
    }
  };

  const handleNewChapter = async (subject) => {
    if (!chapterform.name.trim()) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/subject/${subject}`,
        {
          name: chapterform.name,
        },
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
      window.location.reload();

      // Update the subjects list with the new chapter
      setSubjects((prevSubjects) =>
        prevSubjects.map((sub) =>
          sub.id === subject
            ? { ...sub, chapters: [...sub.chapters, response.data.data] }
            : sub
        )
      );

      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
      }
      setChapterform({ name: "" });
      setNewChapter(false);
    } catch (error) {
      console.error("Failed to create new chapter:", error);
    }
  };

  const handleChapterChange = (e) => {
    try {
      setChapterform((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } catch (error) {
      console.log("Error setting chapter form:", error);
      window.location.reload();
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      if (!selectedChapter) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/chapter/${selectedChapter.id}/notes`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );
        setNotes(response.data.data[0]?.notes || []);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setNotes([]);
      }
    };

    fetchNotes();
  }, [selectedChapter]);

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    // On mobile, close sidebar after selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#480179]"></div>
          <p className="mt-4 text-[#480179] font-medium">Loading subjects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <div className="text-center p-8 rounded-lg shadow-md bg-white border border-red-200 max-w-md">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-red-100 p-3">
              <X className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Failed to Load Subjects
          </h2>
          <p className="text-gray-600 mb-4">
            We couldn&apos;t load your subjects at this time. Please check your
            connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setSubjectForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subjectform.name.trim()) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/${router.communityid}/add-subjects`,
        {
          name: subjectform.name,
        },
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

      setSubjects((prev) => [...prev, response.data.data]);
      setSubjectForm({ name: "" });
      setNewSubject(false);
    } catch (error) {
      console.error("Failed to create subject:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 relative overflow-hidden">
      <Toaster />
      {/* Modals */}
      <AnimatePresence>
        {newChapter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setNewChapter(false)}
          >
            <motion.form
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={(e) => {
                e.preventDefault();
                handleNewChapter(selectedSubject.id);
              }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative m-4"
            >
              <button
                type="button"
                onClick={() => setNewChapter(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#480179]/10 mb-4">
                  <Folder className="h-8 w-8 text-[#480179]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Add New Chapter
                </h2>
                <p className="text-gray-500 mt-1">
                  Create a new chapter for {selectedSubject?.name}
                </p>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Chapter Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={chapterform.name}
                  onChange={handleChapterChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#480179]"
                  placeholder="Enter chapter name"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setNewChapter(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#480179] text-white py-3 px-4 rounded-lg hover:bg-[#5C0C99] transition-colors flex items-center justify-center"
                >
                  <Check className="mr-2" size={18} />
                  Add Chapter
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}

        {newSubject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setNewSubject(false)}
          >
            <motion.form
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative m-4"
            >
              <button
                type="button"
                onClick={() => setNewSubject(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#480179]/10 mb-4">
                  <Book className="h-8 w-8 text-[#480179]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Add New Subject
                </h2>
                <p className="text-gray-500 mt-1">
                  Create a new subject for your community
                </p>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={subjectform.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#480179]"
                  placeholder="Enter subject name"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setNewSubject(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#480179] text-white py-3 px-4 rounded-lg hover:bg-[#5C0C99] transition-colors flex items-center justify-center"
                >
                  <Check className="mr-2" size={18} />
                  Add Subject
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {notesUpload && (
        <NotesForm
          onOpen={notesUpload}
          setOnOpen={setNotesUpload}
          chapterId={selectedChapter.id}
        />
      )}

      {addParticipant && (
        <Participants
          onSetAdd={setAddParticipant}
          communityId={router.communityid}
        />
      )}

      <TodoRoute />

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-20 bg-white p-2 rounded-full shadow-md"
      >
        {sidebarOpen ? <X size={20} /> : <Book size={20} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-xs md:max-w-md lg:w-80 bg-white border-r border-gray-200 shadow-lg md:shadow-none fixed md:relative z-10 h-full overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => (window.location.href = "/community")}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-xl font-bold text-gray-800 truncate">
                  {communityName}
                </h2>
              </div>
              <button
                onClick={() => setAddParticipant(true)}
                className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
                title="Manage participants"
              >
                <User className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2 px-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Subjects
              </div>

              {subjects.length === 0 ? (
                <div className="text-center py-10 px-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                    <Book className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No subjects available</p>
                  <button
                    onClick={() => setNewSubject(true)}
                    className="mt-3 text-sm text-[#480179] hover:underline"
                  >
                    Create your first subject
                  </button>
                </div>
              ) : (
                subjects.map((subject) => (
                  <div key={subject.id} className="mb-1">
                    <div
                      onClick={() => handleSubjectSelect(subject)}
                      className={`px-4 py-3 mx-1 cursor-pointer flex items-center justify-between hover:bg-gray-100 rounded-lg transition-colors ${
                        selectedSubject?.id === subject.id
                          ? "bg-[#480179]/10 text-[#480179]"
                          : "text-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <Book className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium truncate">
                          {subject.name}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          title="Add chapter"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSubject(subject);
                            setNewChapter(true);
                          }}
                        >
                          <PlusCircle className="w-4 h-4 text-gray-500" />
                        </button>
                        {expandedSubjects[subject.id] ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                    </div>

                    {/* Chapters Dropdown */}
                    <AnimatePresence>
                      {expandedSubjects[subject.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-10 pr-3 py-1 space-y-1 overflow-hidden"
                        >
                          {subject.chapters && subject.chapters.length > 0 ? (
                            subject.chapters.map((chapter) => (
                              <div
                                key={chapter.id}
                                onClick={() => handleChapterSelect(chapter)}
                                className={`px-3 py-2 cursor-pointer rounded-md hover:bg-gray-100 transition-colors ${
                                  selectedChapter?.id === chapter.id
                                    ? "bg-[#480179]/10 text-[#480179] font-medium"
                                    : "text-gray-600"
                                }`}
                              >
                                <div className="flex items-center">
                                  <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                                  <span className="truncate">
                                    {chapter.name}
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-3 text-sm text-gray-500">
                              No chapters yet
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t mt-auto">
              <button
                onClick={() => setNewSubject(true)}
                className="flex items-center justify-center w-full bg-[#480179] text-white py-2.5 px-4 rounded-lg hover:bg-[#5C0C99] transition-colors"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                <span className="font-medium">Create New Subject</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <div
        className={`flex-1 bg-white overflow-y-auto transition-all duration-300 ${
          sidebarOpen ? "md:ml-0" : ""
        }`}
      >
        {!selectedChapter ? (
          <div className="h-full flex flex-col justify-center items-center text-center p-8">
            <div className="max-w-md">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-3">
                Choose a Chapter to Study
              </h2>
              <p className="text-gray-500 mb-6">
                Select a subject and chapter from the sidebar to view its
                contents and start your learning journey.
              </p>
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <Book className="w-4 h-4 mr-2" />
                View Subjects
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <span className="hidden md:block">
                    {selectedSubject.name !== null && selectedSubject.name}
                  </span>
                  <ChevronDown className="w-3 h-3 hidden md:block" />
                  <span className="hidden md:block">
                    {selectedChapter.name !== null && selectedChapter.name}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left text-gray-800">
                  {selectedChapter.name !== null && selectedChapter.name}
                </h1>
              </div>

              <button
                onClick={() => setNotesUpload(true)}
                className="flex items-center justify-center gap-2 bg-[#480179] text-white py-2.5 px-5 rounded-lg hover:bg-[#5C0C99] transition-colors shadow-sm"
              >
                <Upload className="w-4 h-4" />
                <span className="font-medium">Upload Notes</span>
              </button>
            </div>

            {Notes.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center mt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No Notes Available
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  There are no notes for this chapter yet. Be the first to
                  contribute study materials!
                </p>
                <button
                  onClick={() => setNotesUpload(true)}
                  className="inline-flex items-center justify-center gap-2 bg-[#480179] text-white py-2.5 px-6 rounded-lg hover:bg-[#5C0C99] transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span className="font-medium">Upload Notes</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {Notes.map((note, index) => (
                  <motion.div
                    key={note.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NotesCard note={note} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunitySubjectsPage;
