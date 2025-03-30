"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Download, Loader, ArrowLeft } from "lucide-react";
import Link from "next/link";

function PDFViewer() {
  const router = useParams();
  const [noteUrl, setNoteUrl] = useState("");
  const [noteDetails, setNoteDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch note data
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community/get-by-notes-id/${router.noteid}`,
          {
            withCredentials: true,
          }
        );

        if (response.data && response.data.data) {
          setNoteUrl(response.data.data.documentLink);
          setNoteDetails(response.data.data);
        } else {
          setError("Could not retrieve note data");
        }
      } catch (err) {
        console.error("Error fetching note:", err);
        setError("Error loading the note. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (router.noteid) {
      fetchNotes();
    }
  }, [router.noteid]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-700">
        <div className="text-center text-white">
          <Loader className="animate-spin h-8 w-8 mx-auto mb-4" />
          <p>Loading PDF viewer...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-700">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
          <h2 className="text-red-500 text-xl font-bold mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Link href="/community" className="text-blue-500 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-700 p-4">
      {/* Header with note details */}
      {noteDetails && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <Link
                href="/notes"
                className="text-blue-500 flex items-center mb-2"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Notes
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">
                {noteDetails.title}
              </h1>
              <p className="text-gray-600">{noteDetails.description}</p>
            </div>
            <a
              href={noteUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </div>
        </div>
      )}

      {/* PDF Viewer using iframe */}
      <div className="flex gap-8 rounded-lg shadow-lg overflow-hidden">
        {noteUrl && (
          <iframe
            src={`${noteUrl}#toolbar=1&navpanes=0&scrollbar=0`}
            className="w-2/3 h-[90svh] border-none"
            title={noteDetails?.title || "PDF Viewer"}
            loading="lazy"
          />
        )}
        {/* <div className="w-1/2 bg-white h-full">P</div> */}
      </div>
    </div>
  );
}

export default PDFViewer;
