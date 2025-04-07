import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      // Add user message
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: inputText, isBot: false },
      ]);

      const question = inputText;
      setInputText("");
      setIsLoading(true);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/test/ai/chatbot`,
          {
            question: question,
          }
        );

        // Add bot response
        setMessages((prev) => [
          ...prev,
          { id: prev.length + 1, text: response.data, isBot: true },
        ]);
      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "Sorry, I'm having trouble connecting right now. Please try again later.",
            isBot: true,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-purple-600">
      {/* Chat container - takes up most of the space */}
      <div className="flex-1 overflow-hidden flex flex-col bg-white mx-2 my-2 rounded-lg">
        {/* Messages area with scrolling */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2 ${
                    message.isBot
                      ? "bg-gray-100 text-gray-800"
                      : "bg-purple-600 text-white"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-xl px-4 py-2 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input area - fixed at bottom */}
      <div className="p-2 pb-4 ">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 py-3 px-4 rounded-full bg-white border-0 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="bg-white text-purple-600 p-3 rounded-full hover:bg-purple-100 transition-colors"
            disabled={isLoading}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
