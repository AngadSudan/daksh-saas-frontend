"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
function NotesForm({ onOpen, setOnOpen, chapterId }) {
  console.log(onOpen);
  const [newNotes, setNewNotes] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newNotes.title);
    formData.append("description", newNotes.description);
    if (file) {
      formData.append("notes", file); // Append the selected file
    }
    if (!file) {
      return null;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/chapter/${chapterId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
      }
      console.log("File uploaded successfully:", response.data.data);
      setOnOpen(false);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("error in file upload");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewNotes({ ...newNotes, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
    const allowedTypes = [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];

    if (!allowedTypes.includes(file.type)) {
      event.target.value = ""; // Clear input
      return;
    }

    if (file.size > maxSize) {
      event.target.value = ""; // Clear input
      return;
    }
    setFile(event.target.files[0]);
    console.log("Selected file:", file);
  };

  return (
    <div>
      <AnimatePresence>
        <Toaster />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setOnOpen(false)}
        >
          <motion.form
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative"
            encType="multipart/form-data"
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
              Add new Notes
            </h2>

            {/* Title Input */}

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="name"
                name="title"
                value={newNotes.title}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#480179]"
                placeholder="Enter notes title"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <input
                type="text"
                id="name"
                name="description"
                value={newNotes.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#480179]"
                placeholder="Enter notes description"
              />
            </div>

            {/* File Upload Input */}
            <div className="mb-4">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Notes (PDF/PPT 10 MB max)
              </label>
              <input
                type="file"
                id="notes"
                name="notes"
                accept=".pdf, .ppt, .pptx"
                size={10 * 1024 * 1025}
                onChange={handleFileChange}
                className="w-full p-3 border rounded-lg border-gray-300 cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#480179] text-white py-3 rounded-lg hover:bg-[#5C0C99] transition-colors flex items-center justify-center"
            >
              {loading && (
                <>
                  <Loader className="animate-spin h-6 w-6" />
                  Uploading might take time...
                </>
              )}
              {!loading && (
                <>
                  <Check className="mr-2" size={20} />
                  Upload Notes
                </>
              )}
            </button>
          </motion.form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default NotesForm;
