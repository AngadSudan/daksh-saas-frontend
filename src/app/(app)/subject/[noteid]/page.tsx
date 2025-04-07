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

  if (!localStorage.getItem("user")) {
    window.location.href = "/login";
  }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-700">
        <div className="text-center text-white">
          <Loader className="animate-spin h-8 w-8 mx-auto mb-4" />
          <p>Loading document viewer...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg max-w-md"
        >
          <h2 className="text-red-500 text-xl font-bold mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Link href="/community" className="text-blue-500 flex items-center">
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-700 p-4">
      {/* Header with note details in NotesCard style */}
      {noteDetails && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 mb-6"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <Link
                href="/community"
                className="text-blue-500 flex items-center mb-2 hover:underline"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Notes
              </Link>

              <div className="flex items-center mb-2">
                <FileText className="h-5 w-5 text-blue-500 mr-2" />
                <h1 className="text-2xl font-bold text-gray-800">
                  {noteDetails.title}
                </h1>
              </div>

              <div className="flex items-center text-gray-500 mb-4">
                <CalendarDays className="h-4 w-4 mr-2" />
                <span>{formattedDate}</span>
              </div>

              <p className="text-gray-600 mb-4">{noteDetails.description}</p>

              <div className="flex items-center">
                <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  {fileType.toUpperCase()}
                </span>
              </div>
            </div>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={documentUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </motion.a>
          </div>
        </motion.div>
      )}
      <div className="flex gap-2">
        {/* Document Viewer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 w-3/5 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {documentUrl && (
            <iframe
              src={getViewerUrl()}
              className="w-full h-[80vh] border-none"
              title={noteDetails?.title || "Document Viewer"}
              loading="lazy"
              allowFullScreen
            />
          )}
        </motion.div>

        <div className="w-2/5 bg-white h-[80svh]">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}

export default DocumentViewer;
