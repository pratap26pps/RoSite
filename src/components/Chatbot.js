import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("/api/chat", { message: input });
      setMessages([...newMessages, { role: "assistant", content: res.data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "Something went wrong!" }]);
    }
  };

  return (
    <>
      <button
        onClick={() => setShow(!show)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white z-50 rounded-full w-14 h-14 shadow-lg"
      >
        💬
      </button>

      {show && (
        <div className="fixed bottom-20 bg-gray-700 z-50 right-5 shadow-xl rounded-lg w-80 max-h-[400px] flex flex-col">
          <div className="p-3 border-b font-bold">Ask RO Assistant</div>
          <div className="p-2 bg-gray-5̦̦00 overflow-y-auto flex-1">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block p-2 rounded ${
                    msg.role === "user" ? "bg-blue-500" : "bg-gray-600"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 border rounded"
              placeholder="Ask a question..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
