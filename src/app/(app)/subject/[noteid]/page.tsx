"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Download,
  Loader,
  ArrowLeft,
  FileText,
  CalendarDays,
  Maximize,
  Minimize,
  Eye,
  NotebookText,
  Computer,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Chatbot from "@/components/general/Chatbot";
import PreviewText from "@/components/general/PreviewText";

function DocumentViewer() {
  const router = useParams();
  const [documentUrl, setDocumentUrl] = useState("");
  const [noteDetails, setNoteDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileType, setFileType] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const [view, setView] = useState("split"); // "split", "fullWidth", or "summary"
  const [text, setText] = useState("");
  const [quizId, setQuizId] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.href = "/login";
    }
  }, []);

  // Fetch note data
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/get-by-notes-id/${router.noteid}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );
        console.log(response.data.data);
        if (response.data && response.data.data) {
          const url = response.data.data.documentLink;
          setDocumentUrl(url);
          setNoteDetails(response.data.data);
          if (response.data.data.summary?.summary) {
            setText(response.data.data.summary.summary);
          }
          if (response.data.data.summary?.quiz) {
            setQuizId(response.data.data.summary.id);
          }
          // Determine file type from URL
          if (url.toLowerCase().endsWith(".pdf")) {
            setFileType("pdf");
          } else if (url.toLowerCase().endsWith(".pptx")) {
            setFileType("pptx");
          } else {
            // Default to PDF viewer for other types
            setFileType("pdf");
          }
        } else {
          setError("Could not retrieve note data");
        }
      } catch (err) {
        console.error("Error fetching note:", err);
        setError("Error loading the document. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (router.noteid) {
      fetchNotes();
    }
  }, [router.noteid]);

  const formattedDate = noteDetails?.createdAt
    ? new Date(noteDetails.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  // Toggle fullscreen view of document
  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  // Toggle between different view modes
  const toggleFullWidth = () => {
    setView(view === "fullWidth" ? "split" : "fullWidth");
  };

  const toggleSummary = () => {
    setView(view === "summary" ? "split" : "summary");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-100 to-violet-200">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <Loader className="animate-spin h-10 w-10 mx-auto mb-4 text-[#4E0684]" />
          <p className="text-gray-700 font-medium">
            Loading document viewer...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-100 to-violet-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg max-w-md"
        >
          <h2 className="text-red-500 text-xl font-bold mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Link
            href="/community"
            className="text-blue-500 flex items-center hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Notes
          </Link>
        </motion.div>
      </div>
    );
  }

  // Get the appropriate viewer URL based on file type
  const getViewerUrl = () => {
    if (fileType === "pdf") {
      return `${documentUrl}#toolbar=1&navpanes=0&scrollbar=0`;
    } else if (fileType === "pptx") {
      // For PPTX, we'll use Microsoft's Office Online viewer or Google's viewer
      // For Cloudinary URLs, we need to use the direct URL
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        documentUrl
      )}`;
    }
    return documentUrl;
  };

  // Apply fullscreen styles conditionally
  const mainContainerClass = fullScreen
    ? "fixed inset-0 z-50 bg-white"
    : "min-h-screen flex flex-col bg-gradient-to-r from-violet-100 to-violet-200 p-4 md:p-6";

  return (
    <div className={mainContainerClass}>
      {/* Header with note details - Hide when in fullscreen */}
      {!fullScreen && noteDetails && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-4"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="flex flex-col">
              <Link
                href="/community"
                className="text-[#4E0684] flex items-center mb-2 hover:underline"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Notes
              </Link>

              <div className="flex items-center mb-2">
                <FileText className="h-5 w-5 text-[4E0684]/90 mr-2 flex-shrink-0" />
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 break-words">
                  {noteDetails.title}
                </h1>
              </div>

              <div className="flex items-center text-gray-500 mb-4">
                <CalendarDays className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{formattedDate}</span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2 md:line-clamp-none">
                {noteDetails.description}
              </p>

              <p className="flex gap-1">
                <AlertTriangle className="w-5 h-5 text-gray-500" />
                <span className="text-gray-400 text-sm">
                  If a download pop-up appears, then the file cannot be viewed
                  in the web browser. Please download the file to view it.
                </span>
              </p>
              {!text && !quizId && (
                <p className="flex gap-1">
                  <AlertTriangle className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-400 text-sm">
                    AI Summary and quiz is being generated or the document
                    parsing failed.
                  </span>
                </p>
              )}
              {/* <div className="flex flex-wrap gap-2 items-center mb-4 md:mb-0">
                <span className="inline-flex items-center justify-center bg-gray-100 text-[#4E0684] text-xs font-medium px-2.5 py-1 rounded-full">
                  {fileType.toUpperCase()}
                </span>
                {noteDetails.tags &&
                  noteDetails.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center justify-center bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
              </div> */}
            </div>

            <div className="grid grid-cols-2 md:flex  gap-2 mt-4 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFullWidth}
                className={`flex items-center ${
                  view === "fullWidth"
                    ? "bg-violet-100 text-[#4E0684]"
                    : "bg-gray-100 text-gray-700"
                } px-3 py-2 rounded hover:bg-gray-200 transition-colors`}
              >
                <Eye className="mr-2 h-4 w-4" />
                {view === "fullWidth" ? "Show Chat" : "Full Width"}
              </motion.button>
              {quizId && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.location.href = `${router.noteid}/quiz/${quizId}`;
                  }}
                  className={`flex items-center ${"bg-gray-100 text-gray-700"} px-3 py-2 rounded hover:bg-gray-200 transition-colors`}
                >
                  <Computer className="mr-2 h-4 w-4" />
                  Take Quiz
                </motion.button>
              )}
              {text && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleSummary}
                  className={`flex items-center ${
                    view === "summary"
                      ? "bg-violet-100 text-[#4E0684]"
                      : "bg-gray-100 text-gray-700"
                  } px-3 py-2 rounded hover:bg-gray-200 transition-colors`}
                >
                  <NotebookText className="mr-2 h-4 w-4" />
                  {view === "summary" ? "Hide Summary" : "Show Summary"}
                </motion.button>
              )}

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={documentUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-[#4E0684] text-white px-3 py-2 rounded hover:bg-[#4E0684]/90 transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main content area */}
      <div
        className={`flex flex-col md:flex-row ${
          fullScreen ? "h-full" : "gap-4"
        }`}
      >
        {/* Document Viewer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${
            view === "fullWidth" || fullScreen ? "w-full" : "w-full md:w-3/5"
          } bg-white rounded-lg shadow-lg overflow-hidden relative`}
        >
          {/* Fullscreen toggle button */}
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={toggleFullScreen}
              className="p-2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full shadow-md text-gray-700 hover:text-blue-500 transition-colors"
              title={fullScreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {fullScreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </button>
          </div>
          {/* Document iframe */}
          {documentUrl && (
            <iframe
              src={getViewerUrl()}
              className={`w-full border-none ${
                fullScreen ? "h-[100svh]" : "h-[75vh]"
              } max-w-full overflow-auto`}
              title={noteDetails?.title || "Document Viewer"}
              loading="lazy"
              allowFullScreen
              style={{
                WebkitOverflowScrolling: "touch",
                maxWidth: "100vw",
              }}
            />
          )}
        </motion.div>

        {/* Right side panel - only show when not in fullWidth mode or fullScreen */}
        {view !== "fullWidth" && !fullScreen && (
          <div className="w-full md:w-2/5 bg-white rounded-lg shadow-lg overflow-hidden h-[75vh] mt-4 md:mt-0">
            {view === "summary" ? <PreviewText text={text} /> : <Chatbot />}
          </div>
        )}
      </div>

      {/* Fullscreen exit button at bottom center */}
      {fullScreen && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={toggleFullScreen}
            className="flex items-center gap-2 px-4 py-2 bg-[#4E0684] text-white rounded-full shadow-lg hover:bg-[#4E0684]/90 transition-colors"
          >
            <Minimize className="h-4 w-4" />
            Exit Fullscreen
          </button>
        </div>
      )}
    </div>
  );
}

export default DocumentViewer;
