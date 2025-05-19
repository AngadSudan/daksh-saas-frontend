"use client";
import axios from "axios";
import React, { useEffect } from "react";
import ReactViewAdobe from "react-adobe-embed";
function Page() {
  const [content, setContent] = React.useState([]);
  useEffect(() => {
    const text = `# Header 1\n\n## Header 2\n\n### Header 3\n\nThis is a paragraph.\n\nThis is another paragraph.`;
    const getAiTextSummary = async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/test/ai/generateSummarizedText`,
        {
          text: "Beehive: Notes for the Teacher\n**Key Points:**\n\n- This English textbook for Class IX follows the National Curriculum Framework (2005), emphasizing comprehensible input and a multilingual approach.\n\n- It aims to develop reading comprehension and confident communication in English.\n\n- The book uses learner-friendly language and includes diverse reading materials spanning various genres (story, biography, autobiography, science fiction, humor, travelogue, one-act play, and poetry) and themes (childhood, adolescence, disability, talent, achievement, music, science, social and environmental concerns).\n\n- The textbook incorporates activities to encourage prediction, critical thinking, vocabulary enrichment (using dictionaries, word building, phrasal verbs), grammar in context, and communicative skills (speaking and writing).\n\n- It integrates language skills (listening, reading, processing, recall, writing) through updated dictation exercises and encourages the use of learners' other languages.\n\n- Units include pre-reading activities ('Before You Read'), comprehension exercises ('Thinking about the Text'), language-focused activities ('Thinking about Language'), and speaking and writing tasks.\n\n**Summary:**\n\nThis teacher's guide outlines the pedagogical approach and content of *Beehive*, a Class IX English textbook. The curriculum emphasizes a learner-centered approach, using accessible language and diverse reading materials to enhance comprehension and communication skills. The book integrates various genres and themes relevant to students’ interests and cognitive development. Activities promote critical thinking, vocabulary building, grammar understanding, and the development of both oral and written communication skills. It also integrates language skills and encourages multilingual perspectives. The guide provides detailed suggestions for classroom activities for each unit, including debates, presentations, dictionary exercises, and writing assignments, aiming to foster a dynamic and engaging learning environment.",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setContent(response.data);
      console.log(response.data);
    };

    getAiTextSummary();
  }, []);

  const pdfUrl =
    "https://res.cloudinary.com/djy3ewpb8/image/upload/v1745559880/notes/class10thEnglish.pdf_1745559756741.pdf";

  return (
    <div style={{ textAlign: "justify", padding: "20px" }}>
      {/* <StructuredPreview contentData={content} /> */}
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
}

export default Page;
