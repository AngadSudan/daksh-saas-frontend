"use client";

import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import ReactViewAdobe from "react-adobe-embed";
// Remove this import as it's not needed and could cause issues
// import "pdfjs-dist/build/pdf.worker.min.mjs";

// Set the worker source correctly
// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

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
      <ReactViewAdobe
        clientId={process.env.NEXT_PUBLIC_ADOBE_KEY}
        title="Daksh Document"
        url={pdfUrl}
        id="pdf-brochure"
        fileMeta={{
          fileName: "Bodea Brochure",
        }}
        previewConfig={{
          defaultViewMode: "SINGLE_PAGE",
          showAnnotationTools: false,
          showPageControls: true,
          showDownloadPDF: true,
        }}
        style={{
          height: "100vh",
          width: "50vw",
        }}
      />
    </div>
  );
};

export default PDFViewer;
