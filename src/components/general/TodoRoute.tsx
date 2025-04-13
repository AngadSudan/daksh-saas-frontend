"use client";
import React, { useState } from "react";
import { Pencil, Plus, FileText } from "lucide-react";
import Link from "next/link";

// Enhanced component with customizable props
function TodoButton({
  href = "/todo",
  position = "bottom-10 right-10",
  tooltipText = "Add a Todo",
  icon = "pencil",
  size = "md",
  bgColor = "bg-white",
  textColor = "text-black",
  className = "",
}) {
  const [hovered, setHovered] = useState(false);

  // Size mappings
  const sizes = {
    sm: {
      button: "w-8 h-8",
      icon: "text-lg",
    },
    md: {
      button: "w-10 h-10",
      icon: "text-xl",
    },
    lg: {
      button: "w-12 h-12",
      icon: "text-2xl",
    },
  };

  // Icon selection
  const getIcon = () => {
    switch (icon) {
      case "pencil":
        return <Pencil className={`${sizes[size].icon}`} />;
      case "plus":
        return <Plus className={`${sizes[size].icon}`} />;
      case "file":
        return <FileText className={`${sizes[size].icon}`} />;
      default:
        return <Pencil className={`${sizes[size].icon}`} />;
    }
  };

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed ${position} ${sizes[size].button} rounded-full flex items-center justify-center shadow-lg ${bgColor} hover:shadow-xl transition-all duration-200 ${className}`}
    >
      <div className="relative">
        {hovered && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <div
              className={`${bgColor} rounded-md py-1 px-3 shadow-md ${textColor} text-sm`}
            >
              {tooltipText}
              <div
                className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 ${bgColor}`}
              ></div>
            </div>
          </div>
        )}
        {getIcon()}
      </div>
    </Link>
  );
}

// Legacy component for backward compatibility
function TodoRoute() {
  return (
    <TodoButton
      href="/todo"
      position="bottom-10 right-20"
      tooltipText="Add a Todo"
      icon="pencil"
      size="md"
    />
  );
}

export { TodoButton, TodoRoute as default };
