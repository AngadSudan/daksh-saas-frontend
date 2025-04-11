import React, { useEffect, useState } from "react";

function PreviewText({ text }) {
  const [processedContent, setProcessedContent] = useState([]);

  useEffect(() => {
    if (text) {
      // Process and format the text
      const contentBlocks = parseContent(text);
      setProcessedContent(contentBlocks);
    }
  }, [text]);

  // Parse content into blocks with appropriate formatting
  const parseContent = (content) => {
    if (!content) return [];

    // Split content by lines
    const lines = content.split("\n");
    const blocks = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Skip empty lines
      if (trimmedLine === "") {
        // Add a spacer if not at the beginning
        if (blocks.length > 0) {
          blocks.push({ type: "spacer", content: "", id: `spacer-${index}` });
        }
        return;
      }

      // Check for headers (lines starting with #)
      const headerMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
      if (headerMatch) {
        const level = headerMatch[1].length;
        blocks.push({
          type: "header",
          level,
          content: headerMatch[2],
          id: `header-${index}`,
        });
        return;
      }

      // Regular paragraph
      blocks.push({
        type: "paragraph",
        content: trimmedLine,
        id: `para-${index}`,
      });
    });

    return blocks;
  };

  // Get appropriate styles for header levels
  const getHeaderStyles = (level) => {
    switch (level) {
      case 1:
        return "text-2xl font-bold text-blue-800 mt-6 mb-3";
      case 2:
        return "text-xl font-semibold text-blue-700 mt-5 mb-3";
      case 3:
        return "text-lg font-medium text-blue-600 mt-4 mb-2";
      default:
        return "text-base font-medium text-blue-500 mt-3 mb-2";
    }
  };

  return (
    <div className="h-full overflow-auto bg-white p-6">
      <div className="border-b border-gray-200 pb-3 mb-4">
        <h2 className="text-xl font-semibold text-blue-700">
          Document Summary
        </h2>
      </div>

      {processedContent.length > 0 ? (
        <div className="font-sans text-gray-800">
          {processedContent.map((block) => {
            if (block.type === "header") {
              return (
                <div key={block.id} className={getHeaderStyles(block.level)}>
                  {block.content}
                </div>
              );
            } else if (block.type === "paragraph") {
              return (
                <p key={block.id} className="my-2 leading-relaxed">
                  {block.content}
                </p>
              );
            } else if (block.type === "spacer") {
              return <div key={block.id} className="h-4"></div>;
            }
            return null;
          })}
        </div>
      ) : (
        <div className="text-gray-500 italic">No summary available</div>
      )}
    </div>
  );
}

export default PreviewText;
