import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function History() {
  const navigate   = useNavigate();
  const [sessions, setSessions]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [expandedId, setExpandedId]   = useState(null);
  const [deleting, setDeleting]       = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ── Load all sessions for current user ────────────────────────
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = auth.currentUser;
        if (!user) { navigate("/login"); return; }

        const q = query(
          collection(db, "chatHistory"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          createdAt: d.data().createdAt?.toDate(),
          updatedAt: d.data().updatedAt?.toDate(),
        }));
        setSessions(data);
      } catch (err) {
        console.error("Failed to load history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  // ── Delete a session ─────────────────────────────────────────
  const handleDelete = async (e, sessionId) => {
    e.stopPropagation();
    if (!window.confirm("Delete this chat session?")) return;
    setDeleting(sessionId);
    try {
      await deleteDoc(doc(db, "chatHistory", sessionId));
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(null);
    }
  };

  // ── Format date ───────────────────────────────────────────────
  const formatDate = (date) => {
    if (!date) return "";
    const now  = new Date();
    const diff = now - date;
    const mins = Math.floor(diff / 60000);
    const hrs  = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1)   return "Just now";
    if (mins < 60)  return `${mins}m ago`;
    if (hrs  < 24)  return `${hrs}h ago`;
    if (days < 7)   return `${days}d ago`;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  // ── Risk color ────────────────────────────────────────────────
  const getRiskColor = (prob) => {
    if (!prob) return "";
    if (prob > 0.7) return "text-red-400";
    if (prob > 0.4) return "text-yellow-400";
    return "text-green-400";
  };

  const getRiskLabel = (prob) => {
    if (!prob) return "";
    if (prob > 0.7) return "High Risk";
    if (prob > 0.4) return "Medium Risk";
    return "Low Risk";
  };

  // ── Filter sessions by search ─────────────────────────────────
  const filteredSessions = sessions.filter((s) =>
    s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.messages?.some((m) => m.text?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // ── Count scam detections in session ─────────────────────────
  const getScamCount = (session) =>
    session.messages?.filter(
      (m) => m.role === "bot" && m.scam_probability && m.scam_probability > 0.5
    ).length || 0;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-950 via-black to-indigo-900 overflow-hidden">

        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/chat")}
              className="text-gray-400 hover:text-white transition-colors text-sm">
              ← Back
            </button>
            <span className="text-white font-semibold">Chat History 📋</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">
              {sessions.length} session{sessions.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* New Chat button */}
          <button
            onClick={() => navigate("/chat", { state: { newChat: true } })}
            className="text-xs px-4 py-2 bg-indigo-500 hover:bg-indigo-600
                       text-white rounded-xl transition-colors">
            + New Chat
          </button>
        </div>

        {/* Search */}
        <div className="px-6 pt-4 pb-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in history..."
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 text-white text-sm
                       placeholder-gray-500 outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Sessions list */}
        <div className="flex-1 overflow-y-auto px-6 py-2 space-y-3">

          {loading && (
            <div className="flex items-center justify-center h-40">
              <div className="text-gray-400 text-sm animate-pulse">Loading history...</div>
            </div>
          )}

          {!loading && filteredSessions.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 gap-3">
              <span className="text-4xl">💬</span>
              <p className="text-gray-400 text-sm">
                {searchQuery ? "No results found" : "No chat history yet"}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => navigate("/chat")}
                  className="text-xs px-4 py-2 bg-indigo-500 hover:bg-indigo-600
                             text-white rounded-xl transition-colors">
                  Start your first chat
                </button>
              )}
            </div>
          )}

          {!loading && filteredSessions.map((session) => {
            const isExpanded  = expandedId === session.id;
            const scamCount   = getScamCount(session);
            const msgCount    = session.messages?.length || 0;
            const lastBotMsg  = [...(session.messages || [])]
              .reverse()
              .find((m) => m.role === "bot");

            return (
              <div key={session.id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden
                           hover:border-white/20 transition-colors">

                {/* Session header — click to expand */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : session.id)}>

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">

                      {/* Title */}
                      <p className="text-white text-sm font-medium truncate">
                        {session.title || "Untitled session"}
                      </p>

                      {/* Meta row */}
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-gray-500 text-xs">
                          {formatDate(session.createdAt)}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {msgCount} message{msgCount !== 1 ? "s" : ""}
                        </span>
                        {scamCount > 0 && (
                          <span className="text-xs px-2 py-0.5 rounded-full
                                          bg-red-500/20 text-red-300 border border-red-500/30">
                            🚨 {scamCount} scam{scamCount !== 1 ? "s" : ""} detected
                          </span>
                        )}
                      </div>

                      {/* Last bot reply preview */}
                      {lastBotMsg && !isExpanded && (
                        <p className="text-gray-500 text-xs mt-1.5 truncate">
                          🤖 {lastBotMsg.text?.slice(0, 80)}...
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => handleDelete(e, session.id)}
                        disabled={deleting === session.id}
                        className="text-gray-600 hover:text-red-400 transition-colors text-xs px-2 py-1
                                   rounded-lg hover:bg-red-500/10">
                        {deleting === session.id ? "..." : "🗑"}
                      </button>
                      <span className="text-gray-600 text-xs">
                        {isExpanded ? "▲" : "▼"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded messages */}
                {isExpanded && (
                  <div className="border-t border-white/10 p-4 space-y-3 max-h-96 overflow-y-auto">
                    {(session.messages || []).length === 0 && (
                      <p className="text-gray-500 text-xs text-center">No messages saved</p>
                    )}

                    {(session.messages || []).map((msg, i) => (
                      <div key={i}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className="max-w-[85%]">

                          {/* Bot meta badges */}
                          {msg.role === "bot" && msg.scam_probability !== undefined && msg.scam_probability !== null && (
                            <div className="mb-1 flex items-center gap-1.5 flex-wrap">
                              <span className={`text-xs font-medium ${getRiskColor(msg.scam_probability)}`}>
                                {getRiskLabel(msg.scam_probability)} ({(msg.scam_probability * 100).toFixed(0)}%)
                              </span>
                              {msg.ml_label && msg.ml_label !== "ham" && (
                                <span className="text-xs px-1.5 py-0.5 rounded-full
                                                bg-orange-500/20 text-orange-300 border border-orange-500/30">
                                  {msg.ml_label}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Message bubble */}
                          <div className={`px-3 py-2 rounded-xl text-xs whitespace-pre-line ${
                            msg.role === "user"
                              ? "bg-indigo-500/80 text-white"
                              : "bg-white/10 text-gray-300"
                          }`}>
                            {msg.text}
                          </div>

                          {/* Timestamp */}
                          <p className="text-gray-600 text-xs mt-0.5 px-1">
                            {msg.timestamp
                              ? new Date(msg.timestamp).toLocaleTimeString("en-IN", {
                                  hour: "2-digit", minute: "2-digit",
                                })
                              : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
    </div>
  );
}