import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Chatbot() {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (show && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [show]);

  // Add welcome message when chat first opens
  useEffect(() => {
    if (show && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content: "Hi! I'm AquaBot, your RO water purification assistant. How can I help you today? 💧",
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  }, [show, messages.length]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/chat", { message: input.trim() });
      
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: res.data.reply,
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment! 😔",
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickReplies = [
    "How to maintain my RO system?",
    "What filters do I need?",
    "Troubleshooting guide",
    "Product recommendations"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setShow(!show)}
        className={`fixed bottom-6 right-6 z-50 ${
          show ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl">
            💬
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
      </button>

      {/* Chat Window */}
      {show && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h3 className="font-semibold">AquaBot Assistant</h3>
                <p className="text-xs text-blue-100">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setShow(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                                 <div
                   className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                     msg.role === "user"
                       ? "bg-blue-500 text-black rounded-br-md"
                       : "bg-white text-black rounded-bl-md border border-gray-200"
                   }`}
                 >
                   <p className="text-sm leading-relaxed">{msg.content}</p>
                   <p className={`text-xs mt-2 ${
                     msg.role === "user" ? "text-black" : "text-gray-600"
                   }`}>
                     {formatTime(msg.timestamp)}
                   </p>
                 </div>
              </div>
            ))}

            

            {/* Quick Replies */}
            {messages.length === 1 && !isLoading && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInput(reply);
                        setTimeout(() => sendMessage(), 100);
                      }}
                      className="text-xs text-gray-700 bg-white border border-gray-200 rounded-full px-3 py-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="w-full px-4 py-3 text-black border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                                 {isLoading && (
                   <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                     <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                   </div>
                 )}
              </div>
                             <button
                 onClick={sendMessage}
                 disabled={!input.trim() || isLoading}
                 className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
               >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      
    </>
  );
}
