"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Book,
  FileText,
  ChevronDown,
  X,
  PlusCircle,
  ArrowLeft,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NotesCard from "@/components/general/NotesCard";
import TodoRoute from "@/components/general/TodoRoute";
import { Skeleton } from "@/components/ui/skeleton";
import NotesForm from "@/components/general/NotesForm";
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
  const [subjectform, setSubjectForm] = useState({
    name: "",
  });
  const [chapterform, setChapterform] = useState({
    name: "",
  });
  const [notesUpload, setNotesUpload] = useState(false);
  const [openDialogBox, setOpenDialogBox] = useState(false);
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
  const handleNewChapter = async (subject) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/subject/${subject}`,
      {
        name: chapterform.name,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data.data);
  };
  const handleChapterChange = (e) => {
    setChapterform((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/chapter/${selectedChapter.id}/notes`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.data[0].notes);
      setNotes(response.data.data[0].notes);
    };
    if (selectedChapter === null) {
      setNotes([]);
      return;
    } else {
      fetchNotes();
    }
  }, [selectedChapter]);
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
  const handleChange = (e) => {
    setSubjectForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/${router.communityid}/add-subjects`,
      {
        name: subjectform.name,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response.data.data);
    setSubjects((prev) => [...prev, response.data.data]);
    setSubjectForm({ name: "" });
  };
  return (
    <div className=" flex h-screen relative">
      {newChapter && (
        <AnimatePresence>
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
              onSubmit={() => {
                handleNewChapter(selectedSubject.id);
              }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setNewChapter(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Add New Chapter
              </h2>

              {/* Community Name Input */}
              <div className="mb-4">
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
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#480179] `}
                  placeholder="Enter subject name"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onSubmit={() => {
                  handleNewChapter(selectedSubject.id);
                }}
                className="w-full bg-[#480179] text-white py-3 rounded-lg hover:bg-[#5C0C99] transition-colors flex items-center justify-center"
              >
                <Check className="mr-2" size={20} />
                Add Chapter
              </button>
            </motion.form>
          </motion.div>
        </AnimatePresence>
      )}
      {newSubject && (
        <AnimatePresence>
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
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setNewSubject(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Add New Subject
              </h2>

              {/* Community Name Input */}
              <div className="mb-4">
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
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#480179] `}
                  placeholder="Enter subject name"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onSubmit={handleSubmit}
                className="w-full bg-[#480179] text-white py-3 rounded-lg hover:bg-[#5C0C99] transition-colors flex items-center justify-center"
              >
                <Check className="mr-2" size={20} />
                Add Subject
              </button>
            </motion.form>
          </motion.div>
        </AnimatePresence>
      )}
      {notesUpload && (
        <NotesForm
          onOpen={notesUpload}
          setOnOpen={setNotesUpload}
          chapterId={selectedChapter.id}
        />
      )}
      <TodoRoute />
      {/* Sidebar */}
      <div className="w-80 bg-gray-50 border-r overflow-y-auto">
        <div className="p-6 border-b flex gap-24">
          <ArrowLeft
            onClick={() => (window.location.href = "/community")}
            className="w-6 h-6 text-gray-400"
          />
          <h2 className="text-2xl font-bold text-gray-800">{communityName}</h2>
        </div>

        <div className="py-4 h-[70svh]">
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
                <div className="flex gap-4">
                  <PlusCircle
                    onClick={() => setNewChapter(true)}
                    className="w-5 h-5 text-gray-400"
                  />
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
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

        <button
          onClick={() => setNewSubject(true)}
          className="flex gap-4 w-[80%] mx-auto bg-[#480179] text-white py-3 px-6 rounded-md mt-4"
        >
          <PlusCircle className="w-5 h-5" />
          <span className="font-semibold">Create New Subject</span>
        </button>
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
            {/* add a grid for all the notes of this particular chapter  */}
            <div className="flex justify-between w-full p-2">
              <h1 className="text-3xl my-auto font-bold text-gray-800 mb-6">
                {selectedChapter.name}
              </h1>

              <button
                onClick={() => {
                  alert("uploading clicked");
                  setNotesUpload(true);
                }}
                className="flex gap-4 w-fit justify-center items-center mx-auto bg-[#480179] text-white py-2 mb-3 px-6 rounded-md "
              >
                <PlusCircle className="w-5 h-5" />
                <span className="font-semibold">Upload Notes</span>
              </button>
            </div>
            {Notes.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {[1, 2, 3].map((_, index) => (
                  <Skeleton key={index} className="h-48 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Notes.map((note, index) => {
                  return <NotesCard note={note} key={index} />;
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunitySubjectsPage;
