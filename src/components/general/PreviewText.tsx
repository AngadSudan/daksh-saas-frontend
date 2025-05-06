"use client";
import React from "react";

function StructuredPreview({ contentData }) {
  contentData = contentData.replaceAll("```json", "```");
  contentData = contentData.replaceAll("```", "");
  console.log(contentData);

  contentData = JSON.parse(contentData);
  // Process paragraph content to handle Markdown elements
  const processText = (text) => {
    if (!text) return [];

    const results = [];
    const currentText = text;
    console.log(currentText);

    // Handle bold text (**text**)
    const boldRegex = /\*\*(.*?)\*\*/g;
    let boldMatch;
    let lastIndex = 0;

    while ((boldMatch = boldRegex.exec(text)) !== null) {
      // Add text before the match
      if (boldMatch.index > lastIndex) {
        results.push({
          type: "text",
          content: text.substring(lastIndex, boldMatch.index),
          id: `text-${lastIndex}`,
        });
      }

      // Add the bold text
      results.push({
        type: "bold",
        content: boldMatch[1],
        id: `bold-${boldMatch.index}`,
      });

      lastIndex = boldMatch.index + boldMatch[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      results.push({
        type: "text",
        content: text.substring(lastIndex),
        id: `text-${lastIndex}`,
      });
    }

    return results;
  };

  // Process paragraph content to handle bullets
  const processParagraph = (content) => {
    if (!content) return [];

    // Split by newlines
    const lines = content.split("\n");
    const blocks = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Skip empty lines
      if (trimmedLine === "") {
        blocks.push({ type: "spacer", id: `spacer-${index}` });
        return;
      }

      // Check for bullet points
      const bulletMatch = trimmedLine.match(/^-\s+(.+)$/);
      if (bulletMatch) {
        blocks.push({
          type: "bullet",
          content: processText(bulletMatch[1]),
          id: `bullet-${index}`,
        });
        return;
      }

      // Regular text
      blocks.push({
        type: "text",
        content: processText(trimmedLine),
        id: `line-${index}`,
      });
    });

    return blocks;
  };

  // Render inline text with proper formatting
  const renderInlineText = (textParts) => {
    if (!Array.isArray(textParts)) {
      return <span>{textParts}</span>;
    }

    return textParts.map((part, index) => {
      if (part.type === "bold") {
        return (
          <strong key={part.id} className="font-bold">
            {part.content}
          </strong>
        );
      } else if (part.type === "text") {
        // Handle italic text within regular text
        const italicRegex = /\*(.*?)\*/g;
        const parts = [];
        let lastIdx = 0;
        let match;
        const content = part.content;

        while ((match = italicRegex.exec(content)) !== null) {
          if (match.index > lastIdx) {
            parts.push(
              <span key={`text-${index}-${lastIdx}`}>
                {content.substring(lastIdx, match.index)}
              </span>
            );
          }
          parts.push(
            <em key={`italic-${index}-${match.index}`} className="italic">
              {match[1]}
            </em>
          );
          lastIdx = match.index + match[0].length;
        }

        if (lastIdx < content.length) {
          parts.push(
            <span key={`text-${index}-${lastIdx}`}>
              {content.substring(lastIdx)}
            </span>
          );
        }

        return parts.length > 0 ? (
          <span key={part.id}>{parts}</span>
        ) : (
          <span key={part.id}>{part.content}</span>
        );
      }
      return <span key={part.id}>{part.content}</span>;
    });
  };

  // Render content blocks based on type
  const renderContent = (item) => {
    switch (item.type) {
      case "heading1":
        return (
          <h1 className="text-2xl font-bold text-[#4E0684]/90 mt-6 mb-3">
            {item.data}
          </h1>
        );

      case "heading2":
        return (
          <h2 className="text-xl font-semibold text-[#4E0684]/90 mt-5 mb-3">
            {item.data}
          </h2>
        );

      case "paragraph": {
        const blocks = processParagraph(item.data);

        return (
          <div className="my-4">
            {blocks.map((block) => {
              if (block.type === "bullet") {
                return (
                  <div key={block.id} className="flex mb-1">
                    <div className="mr-2">•</div>
                    <div className="text-gray-700">
                      {renderInlineText(block.content)}
                    </div>
                  </div>
                );
              } else if (block.type === "text") {
                return (
                  <p key={block.id} className="my-2 leading-relaxed">
                    {renderInlineText(block.content)}
                  </p>
                );
              } else if (block.type === "spacer") {
                return <div key={block.id} className="h-2"></div>;
              }
              return null;
            })}
          </div>
        );
      }

      default:
        return (
          <p className="text-gray-500">Unknown content type: {item.type}</p>
        );
    }
  };

  return (
    <div className="h-full overflow-auto bg-white p-6">
      <div className="border-b border-gray-200 pb-3 mb-4">
        <h2 className="text-xl font-semibold text-[#4E0684]">
          Document Summary
        </h2>
      </div>

      {Array.isArray(contentData) && contentData.length > 0 ? (
        <div className="font-sans text-gray-800">
          {contentData.map((item, index) => (
            <div key={`content-${index}`}>{renderContent(item)}</div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 italic">No summary available</div>
      )}
    </div>
  );
}

<<<<<<< HEAD
export default PreviewText;

// {msg.content.map((item, i) => {

//                                                             item.data = item.data.replace(/\\n/g, '\n').replaceAll("**", "").replace("**", "")

//                                                             if (item.type === 'paragraph') {
//                                                                 return <p key={i} className="whitespace-pre-wrap break-words">{item.data}</p>
//                                                             } else if (item.type === 'co
=======
export default StructuredPreview;
>>>>>>> fe5409bf883787bfe4fe633c1449127360733610
