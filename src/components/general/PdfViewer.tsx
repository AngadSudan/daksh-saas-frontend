"use client";

import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
// Remove this import as it's not needed and could cause issues
// import "pdfjs-dist/build/pdf.worker.min.mjs";

// Set the worker source correctly
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPdf = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(pdfUrl);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        <PDFViewer pdfUrl={objectUrl} />;
        const loadingTask = pdfjsLib.getDocument(objectUrl);
        const loadedPdf = await loadingTask.promise;
        setPdf(loadedPdf);
        setTotalPages(loadedPdf.numPages);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError("Failed to load PDF. Please check the URL and try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPdf();
  }, [pdfUrl]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdf || !canvasRef.current) return;

      try {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport,
        };

        await page.render(renderContext).promise;
      } catch (err) {
        console.error("Error rendering PDF page:", err);
        setError(`Failed to render page ${pageNumber}`);
      }
    };

    renderPage();
  }, [pdf, pageNumber, scale]);

  const changePage = (delta: number) => {
    setPageNumber((current) => {
      const newPage = current + delta;
      return Math.max(1, Math.min(totalPages, newPage));
    });
  };

  const adjustZoom = (delta: number) => {
    setScale((current) => {
      const newScale = current + delta;
      return Math.max(0.5, Math.min(5, newScale));
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading PDF...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="overflow-auto max-w-full">
        <canvas ref={canvasRef} className="shadow-xl border" />
      </div>

      <div className="flex gap-3 items-center justify-center">
        <button
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          ⬅ Prev
        </button>
        <span>
          Page {pageNumber} of {totalPages}
        </span>
        <button
          onClick={() => changePage(1)}
          disabled={pageNumber >= totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => adjustZoom(-0.25)}
          className="px-3 py-1 bg-purple-100 rounded hover:bg-purple-200"
        >
          Zoom Out
        </button>
        <span className="px-3 py-1 bg-gray-100 rounded">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => adjustZoom(0.25)}
          className="px-3 py-1 bg-purple-100 rounded hover:bg-purple-200"
        >
          Zoom In
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
