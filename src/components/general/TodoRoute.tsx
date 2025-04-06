"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import Link from "next/link";
function TodoRoute() {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute w-[30px] h-[30px] rounded-full bottom-10 right-20"
      href="/todo"
    >
      <div className="relative">
        {hovered && (
          <p className="absolute -top-10 -left-5 bg-white rounded-full p-2 text-sm shadow-md text-nowrap text">
            Add a Todo
          </p>
        )}
        <Pencil className="text-[40px]" />
      </div>
    </Link>
  );
}

export default TodoRoute;
