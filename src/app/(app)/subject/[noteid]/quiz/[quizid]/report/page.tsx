"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const router = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/report/user/${router.quizid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      console.log(response);
    };
    fetchData();
  });
  //create a clickable component on opening which all your reports will be shown
  return <div>page</div>;
}

export default page;
