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
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Chatbot from "@/components/general/Chatbot";

function DocumentViewer() {
  const router = useParams();
  const [documentUrl, setDocumentUrl] = useState("");
  const [noteDetails, setNoteDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileType, setFileType] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const [expandedView, setExpandedView] = useState(false);

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

        if (response.data && response.data.data) {
          const url = response.data.data.documentLink;
          setDocumentUrl(url);
          setNoteDetails(response.data.data);

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

  // Toggle expanded view (hide/show chatbot)
  const toggleExpandedView = () => {
    setExpandedView(!expandedView);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <Loader className="animate-spin h-10 w-10 mx-auto mb-4 text-blue-500" />
          <p className="text-gray-700 font-medium">
            Loading document viewer...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
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
    : "min-h-screen flex flex-col bg-gradient-to-r from-blue-100 to-blue-200 p-4 md:p-6";

  return (
    <div className={mainContainerClass}>
      {/* Header with note details - Hide when in fullscreen */}
      {!fullScreen && noteDetails && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-4 md:mb-6"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="flex flex-col">
              <Link
                href="/community"
                className="text-blue-500 flex items-center mb-2 hover:underline"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Notes
              </Link>

              <div className="flex items-center mb-2">
                <FileText className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
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

              <div className="flex flex-wrap gap-2 items-center mb-4 md:mb-0">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
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
              </div>
            </div>

            <div className="flex gap-2 mt-4 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleExpandedView}
                className="flex items-center bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                <Eye className="mr-2 h-4 w-4" />
                {expandedView ? "Show Chat" : "Full Width"}
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={documentUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors"
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
            expandedView || fullScreen ? "w-full" : "w-full md:w-3/5"
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
                fullScreen ? "h-full" : "h-[75vh]"
              }`}
              title={noteDetails?.title || "Document Viewer"}
              loading="lazy"
              allowFullScreen
            />
          )}
        </motion.div>

        {/* Chatbot - Hide when expanded view or fullscreen */}
        {!expandedView && !fullScreen && (
          <div className="w-full md:w-2/5 bg-white rounded-lg shadow-lg overflow-hidden h-[75vh] mt-4 md:mt-0">
            <Chatbot />
          </div>
        )}
      </div>

      {/* Fullscreen exit button at bottom center */}
      {fullScreen && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={toggleFullScreen}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
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
