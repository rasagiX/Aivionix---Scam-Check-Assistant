import { useState, useRef, useEffect } from "react";
import Sidebar from "./component/sidebar";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello 👋 How can I help you?", sender: "bot", isDefault: true }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("Chat");  // Added for Sidebar

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // 🌐 API CALL
  const sendMessageToAPI = async (message) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/check-scam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      return await response.json();
    } catch (error) {
      return {
        result: "Error analyzing message",
        scam_probability: 0,
        reasons: [],
        category: [],
        warning: "",
      };
    }
  };

  // 📊 Risk Bar
  const RiskBar = ({ value }) => {
    let color =
      value > 0.7
        ? "bg-red-500"
        : value > 0.4
        ? "bg-yellow-400"
        : "bg-green-500";

    return (
      <div className="w-full bg-white/10 rounded-full h-2 mt-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${value * 100}%` }}
        ></div>
      </div>
    );
  };

  // ✨ Typing effect
  const typeMessage = async (text, risk = 0) => {
    let current = "";

    setMessages((prev) => [
      ...prev,
      { text: "", sender: "bot", risk, isDefault: false }
    ]);

    for (let i = 0; i < text.length; i++) {
      current += text[i];

      await new Promise((res) => setTimeout(res, 10));

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text = current;
        return updated;
      });
    }
  };

  // 📩 SEND MESSAGE
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;

    setMessages((prev) => [
      ...prev,
      { text: userMsg, sender: "user" }
    ]);

    setHistory((prev) => [...prev, userMsg]);

    setInput("");
    setLoading(true);

    const result = await sendMessageToAPI(userMsg);

    const botReply = [
      result.result,

      result.scam_probability > 0.3
        ? `Risk: ${(result.scam_probability * 100).toFixed(1)}%`
        : "",

      result.category?.length
        ? `Type: ${result.category.join(", ")}`
        : "",

      result.reasons?.length
        ? "Why:\n" + result.reasons.map(r => "• " + r).join("\n")
        : "",

      result.scam_probability > 0.7
        ? "⚠️ Do NOT share OTP or send money!"
        : "",

      result.warning ? "🚨 " + result.warning : ""
    ]
      .filter(Boolean)
      .join("\n\n");

    setLoading(false);

    await typeMessage(botReply, result.scam_probability);
  };

  return (
    <div className="h-screen w-screen flex bg-black overflow-hidden">

      {/* Sidebar */}
      <Sidebar active={activeTab} setActive={setActiveTab} />

      {/* Chat Section */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-indigo-950 via-black to-indigo-900">

        {/* Header */}
        <div className="p-4 border-b border-white/10 text-white font-semibold">
          Avionix Assistant 🤖
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div className="max-w-[70%]">

                <div
                  className={`px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-indigo-500 text-white"
                      : "bg-white/10 text-gray-200"
                  }`}
                >
                  {msg.text}
                </div>

                {/* ✅ Risk only for real messages */}
                {msg.sender === "bot" &&
                  msg.risk !== undefined &&
                  !msg.isDefault && (
                    <RiskBar value={msg.risk} />
                  )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-300 animate-pulse">
              🤖 Analyzing...
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 flex gap-2 bg-black/30">

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSend()
            }
            placeholder="Paste SMS or type message..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white outline-none"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="px-6 py-3 bg-indigo-500 rounded-xl text-white hover:bg-indigo-600 disabled:opacity-50"
          >
            Send
          </button>

        </div>
      </div>
    </div>
  );
}
