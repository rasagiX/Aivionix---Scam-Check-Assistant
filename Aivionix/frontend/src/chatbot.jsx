import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  query,
  where,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";

const LANGUAGES = [
  { code: "auto",     label: "Auto detect",  flag: "🌐" },
  { code: "english",  label: "English",      flag: "🇬🇧" },
  { code: "hinglish", label: "Hinglish",     flag: "🇮🇳" },
  { code: "hindi",    label: "हिंदी",         flag: "🇮🇳" },
  { code: "tamil",    label: "தமிழ்",          flag: "🇮🇳" },
  { code: "telugu",   label: "తెలుగు",         flag: "🇮🇳" },
  { code: "marathi",  label: "मराठी",          flag: "🇮🇳" },
  { code: "bengali",  label: "বাংলা",          flag: "🇮🇳" },
  { code: "gujarati", label: "ગુજરાતી",        flag: "🇮🇳" },
];

const LANG_BADGE_COLORS = {
  english:  "bg-blue-500/20 text-blue-300 border-blue-500/30",
  hinglish: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  hindi:    "bg-green-500/20 text-green-300 border-green-500/30",
  tamil:    "bg-purple-500/20 text-purple-300 border-purple-500/30",
  telugu:   "bg-pink-500/20 text-pink-300 border-pink-500/30",
  marathi:  "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  bengali:  "bg-teal-500/20 text-teal-300 border-teal-500/30",
  gujarati: "bg-red-500/20 text-red-300 border-red-500/30",
};

export default function Chatbot() {
  const navigate = useNavigate();
  const location  = useLocation();

  const [messages, setMessages] = useState([
    {
      text: "Hello! 👋 I'm Avionix, your cyber scam awareness assistant.\n\nYou can:\n• Paste any suspicious SMS or message to check if it's a scam\n• Ask me about any cyber scam (UPI fraud, phishing, KYC scam etc.)\n• Tell me your incident and I'll guide you what to do\n• Upload a screenshot 📸 of any suspicious message\n• Chat in Hindi, Hinglish, Tamil, Telugu, Marathi, Bengali or Gujarati!\n\nHow can I help you today?",
      sender: "bot", isDefault: true, mode: null,
    },
  ]);

  const [input, setInput]                             = useState("");
  const [loading, setLoading]                         = useState(false);
  const [history, setHistory]                         = useState([]);
  const [modelActive, setModelActive]                 = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [selectedLang, setSelectedLang]               = useState("auto");
  const [showLangMenu, setShowLangMenu]               = useState(false);
  const [showComplaintPrompt, setShowComplaintPrompt] = useState(false);
  const [complaintDismissed, setComplaintDismissed]   = useState(false);

  // ── Image upload states ───────────────────────────────────────
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile]       = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  // ── Firestore session tracking ────────────────────────────────
  const [sessionId, setSessionId] = useState(null);
  const sessionIdRef              = useRef(null);

  const bottomRef  = useRef(null);
  const langRef    = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, showComplaintPrompt, imageLoading]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/health")
      .then((r) => r.json())
      .then((d) => setModelActive(d.model_loaded))
      .catch(() => setModelActive(false));
  }, []);

  // ── Reset to new chat if navigated with newChat flag ──────────
  useEffect(() => {
    if (location.state?.newChat) {
      // Clear all chat state for a fresh session
      setMessages([{
        text: "Hello! 👋 I'm Avionix, your cyber scam awareness assistant.\n\nYou can:\n• Paste any suspicious SMS or message to check if it's a scam\n• Ask me about any cyber scam (UPI fraud, phishing, KYC scam etc.)\n• Tell me your incident and I'll guide you what to do\n• Upload a screenshot 📸 of any suspicious message\n• Chat in Hindi, Hinglish, Tamil, Telugu, Marathi, Bengali or Gujarati!\n\nHow can I help you today?",
        sender: "bot", isDefault: true, mode: null,
      }]);
      setConversationHistory([]);
      setInput("");
      setSessionId(null);
      sessionIdRef.current = null;
      setShowComplaintPrompt(false);
      setComplaintDismissed(false);
      setImagePreview(null);
      setImageFile(null);
      // Clear the state so refreshing doesn't reset again
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // ── Load last session on mount ────────────────────────────────
  useEffect(() => {
    const loadLastSession = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const q = query(
          collection(db, "chatHistory"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const snapshot = await getDocs(q);
        if (snapshot.empty) return;
        const lastSession = snapshot.docs[0];
        const data = lastSession.data();
        sessionIdRef.current = lastSession.id;
        setSessionId(lastSession.id);
        const restored = (data.messages || []).map((m) => ({
          text: m.text,
          sender: m.role === "user" ? "user" : "bot",
          isDefault: false,
          mode: m.mode || null,
          risk: m.scam_probability || null,
          mlScore: m.ml_score || null,
          mlLabel: m.ml_label || null,
          ruleScore: m.rule_score || null,
          detectedLang: m.detected_language || null,
        }));
        if (restored.length > 0) {
          setMessages((prev) => [...prev, ...restored]);
          const convHistory = (data.messages || []).map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.text,
          }));
          setConversationHistory(convHistory);
        }
      } catch (err) {
        console.error("Failed to load last session:", err);
      }
    };
    const timer = setTimeout(loadLastSession, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target))
        setShowLangMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Firestore helpers ─────────────────────────────────────────
  const createSession = async (firstMessage) => {
    try {
      const user = auth.currentUser;
      if (!user) return null;
      const docRef = await addDoc(collection(db, "chatHistory"), {
        userId: user.uid, userEmail: user.email,
        title: firstMessage.slice(0, 60),
        messages: [], createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
      });
      sessionIdRef.current = docRef.id;
      setSessionId(docRef.id);
      return docRef.id;
    } catch (err) {
      console.error("Failed to create session:", err);
      return null;
    }
  };

  const saveMessageToFirestore = async (sid, role, text, metadata = {}) => {
    try {
      if (!sid) return;
      await updateDoc(doc(db, "chatHistory", sid), {
        messages: arrayUnion({ role, text, timestamp: new Date().toISOString(), ...metadata }),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  };

  // ── Text API ──────────────────────────────────────────────────
  const sendToAPI = async (message) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, conversation_history: conversationHistory, language: selectedLang }),
      });
      return await res.json();
    } catch {
      return { reply: "Unable to connect. Please make sure FastAPI is running.", mode: "error", scam_probability: null, ml_label: null, ml_score: null, rule_score: null, model_active: false, detected_language: "english" };
    }
  };

  // ── Image API ─────────────────────────────────────────────────
  const sendImageToAPI = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(
        `http://127.0.0.1:8000/analyze-image?language=${selectedLang}`,
        { method: "POST", body: formData }
      );
      return await res.json();
    } catch {
      return { reply: "Image analyze nahi ho saka. Please try again.", mode: "image_error", scam_probability: null, ml_label: null, ml_score: null, rule_score: null, model_active: false, extracted_text: "" };
    }
  };

  // ── Image select handler ──────────────────────────────────────
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, JPEG, WEBP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    // Reset file input so same file can be re-selected
    e.target.value = "";
  };

  // ── Image send handler ────────────────────────────────────────
  const handleImageSend = async () => {
    if (!imageFile || imageLoading) return;
    const previewUrl = imagePreview;

    setMessages((prev) => [...prev, {
      text: "📸 Screenshot uploaded for analysis",
      sender: "user",
      imagePreview: previewUrl,
    }]);
    setHistory((prev) => [...prev, "📸 Screenshot uploaded"]);
    setImagePreview(null);
    setImageFile(null);
    setImageLoading(true);
    setShowComplaintPrompt(false);
    setComplaintDismissed(false);

    let sid = sessionIdRef.current;
    if (!sid) sid = await createSession("Screenshot analysis");
    await saveMessageToFirestore(sid, "user", "📸 Screenshot uploaded for analysis");

    const result = await sendImageToAPI(imageFile);
    setModelActive(result.model_active ?? modelActive);

    let botText = result.reply || "Could not analyze the image.";
    if (result.extracted_text && result.extracted_text.trim()) {
      botText = `📝 Text found in screenshot:\n"${result.extracted_text.slice(0, 200)}${result.extracted_text.length > 200 ? "..." : ""}"\n\n${result.reply}`;
    }

    const updatedHistory = [...conversationHistory, { role: "user", content: "User uploaded a screenshot for scam analysis" }];
    setConversationHistory([...updatedHistory, { role: "assistant", content: botText }]);
    setImageLoading(false);

    await typeMessage(botText, {
      mode: result.mode, risk: result.scam_probability,
      mlScore: result.ml_score, mlLabel: result.ml_label,
      ruleScore: result.rule_score, detectedLang: result.detected_language,
    });

    await saveMessageToFirestore(sid, "bot", botText, {
      mode: result.mode, scam_probability: result.scam_probability,
      ml_label: result.ml_label, detected_language: result.detected_language,
    });

    const botTextLower = botText.toLowerCase();
    if ((botTextLower.includes("1930") || botTextLower.includes("cybercrime.gov.in")) && !complaintDismissed) {
      setShowComplaintPrompt(true);
    }
  };

  // ── Components ────────────────────────────────────────────────
  const RiskBar = ({ value }) => {
    if (value === null || value === undefined) return null;
    const color = value > 0.7 ? "bg-red-500" : value > 0.4 ? "bg-yellow-400" : "bg-green-500";
    return (
      <div className="w-full bg-white/10 rounded-full h-2 mt-2">
        <div className={`${color} h-2 rounded-full transition-all duration-700`} style={{ width: `${value * 100}%` }} />
      </div>
    );
  };

  const ScoreBreakdown = ({ mlScore, ruleScore }) => {
    if (mlScore === null || mlScore === undefined) return null;
    return (
      <div className="mt-3 text-xs text-gray-400 space-y-1">
        <div className="flex justify-between"><span>ML model</span><span className="text-white">{(mlScore * 100).toFixed(0)}%</span></div>
        <div className="w-full bg-white/10 rounded-full h-1.5"><div className="bg-indigo-400 h-1.5 rounded-full transition-all duration-700" style={{ width: `${mlScore * 100}%` }} /></div>
        <div className="flex justify-between mt-1"><span>Rule engine</span><span className="text-white">{(ruleScore * 100).toFixed(0)}%</span></div>
        <div className="w-full bg-white/10 rounded-full h-1.5"><div className="bg-purple-400 h-1.5 rounded-full transition-all duration-700" style={{ width: `${ruleScore * 100}%` }} /></div>
      </div>
    );
  };

  const MLBadge = ({ label }) => {
    if (!label || label === "ham") return null;
    const colors = { spam: "bg-orange-500/20 text-orange-300 border-orange-500/30", phishing: "bg-red-500/20 text-red-300 border-red-500/30", smishing: "bg-pink-500/20 text-pink-300 border-pink-500/30", fraud: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" };
    return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colors[label] || "bg-white/10 text-gray-300 border-white/20"}`}>ML: {label}</span>;
  };

  const ModeBadge = ({ mode }) => {
    const config = {
      "analyze+chat": { label: "Scam analyzed", style: "bg-red-500/20 text-red-300 border-red-500/30" },
      "chat":         { label: "AI assistant",  style: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
      "image+analyze":{ label: "📸 Screenshot", style: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
    };
    const c = config[mode];
    if (!c) return null;
    return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${c.style}`}>{c.label}</span>;
  };

  const LangBadge = ({ lang }) => {
    if (!lang || lang === "english") return null;
    const langInfo = LANGUAGES.find((l) => l.code === lang);
    if (!langInfo) return null;
    return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${LANG_BADGE_COLORS[lang] || "bg-white/10 text-gray-300 border-white/20"}`}>{langInfo.flag} {langInfo.label}</span>;
  };

  const ComplaintPromptCard = () => (
    <div className="flex justify-start mt-4">
      <div className="max-w-[760px] w-full">
        <div className="rounded-3xl border border-red-400/25 bg-red-500/10 p-5 shadow-[0_20px_60px_rgba(239,68,68,0.12)] backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/15 text-xl">🚨</div>
            <div>
              <p className="font-semibold text-red-200">Serious incident detected</p>
              <p className="text-xs text-red-100/60">You may need to report this quickly.</p>
            </div>
          </div>
          <p className="mb-5 text-sm leading-7 text-slate-300">If money was deducted, OTP was shared, or your account was affected, you can report it to the National Cyber Crime Reporting Portal.</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => { setShowComplaintPrompt(false); setComplaintDismissed(true); window.open("https://cybercrime.gov.in", "_blank"); }} className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600">Yes, Report Now</button>
            <button onClick={() => { setShowComplaintPrompt(false); setComplaintDismissed(true); }} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.08]">Maybe Later</button>
          </div>
          <p className="mt-4 text-xs text-slate-400">Cyber Crime Helpline: <span className="font-semibold text-white">1930</span></p>
        </div>
      </div>
    </div>
  );

  // ── Typing effect ─────────────────────────────────────────────
  const typeMessage = async (text, metadata = {}) => {
    let current = "";
    setMessages((prev) => [...prev, { text: "", sender: "bot", isDefault: false, ...metadata }]);
    for (let i = 0; i < text.length; i++) {
      current += text[i];
      await new Promise((res) => setTimeout(res, 8));
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text = current;
        return updated;
      });
    }
  };

  // ── Send text ─────────────────────────────────────────────────
  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setShowComplaintPrompt(false);
    setComplaintDismissed(false);
    setMessages((prev) => [...prev, { text: userMsg, sender: "user" }]);
    setHistory((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    let sid = sessionIdRef.current;
    if (!sid) sid = await createSession(userMsg);
    await saveMessageToFirestore(sid, "user", userMsg);

    const updatedHistory = [...conversationHistory, { role: "user", content: userMsg }];
    const result = await sendToAPI(userMsg);
    setModelActive(result.model_active ?? modelActive);

    const botText = result.reply || "I could not process that.";
    setConversationHistory([...updatedHistory, { role: "assistant", content: botText }]);
    setLoading(false);

    await typeMessage(botText, {
      mode: result.mode, risk: result.scam_probability,
      mlScore: result.ml_score, mlLabel: result.ml_label,
      ruleScore: result.rule_score, detectedLang: result.detected_language,
    });

    await saveMessageToFirestore(sid, "bot", botText, {
      mode: result.mode, scam_probability: result.scam_probability,
      ml_label: result.ml_label, detected_language: result.detected_language,
    });

    const dangerKeywords = [
      "account is empty","account became empty","account become empty","account becomes empty","becomes empty","become empty",
      "money is gone","money was gone","money gone","lost money","lost my money","money deducted","amount deducted","balance is zero",
      "all money gone","bank account empty","savings gone","transferred without","unauthorized transaction",
      "gave my otp","gave otp","i gave otp","shared otp","i shared otp","otp was shared","shared my otp","gave my password","shared my password",
      "phone got hacked","phone is hacked","phone was hacked","phone got attacked","device hacked","someone accessed my phone",
      "malware","virus in my phone","my phone is infected","someone is controlling","remote access","anydesk","teamviewer",
      "account got hacked","account is hacked","account was hacked","someone logged in","unauthorized login",
      "upi hacked","gpay hacked","phonepe hacked","paytm hacked","aadhaar misused","pan misused","identity stolen",
      "someone took loan","loan in my name","sim swapped","sim swap","i got scammed","i was scammed","i got cheated","i was cheated",
      "i have been scammed","clicked the link and","i installed the app","because my bank","my account is empty","my phone is hacked",
      "paise gaye","paise kat","paise cut","account khali","khata khali","paisa gaya","loot liya","paise kat rahe",
      "account se paise","bank se paise","paise nikal","balance kat","sab paise gaye","bank account khali",
      "balance zero ho gaya","paise nikal gaye","kisi ne paise nikal liye","account empty ho gaya",
      "otp de diya","otp diya","otp share kar diya","otp bata diya","otp share kiya","otp share kar liya","galti se otp",
      "maine otp de diya","otp share ho gaya","galti ho gayi","thaga gaya","thagi ho gayi","fraud ho gaya","hack ho gaya",
      "mujhe thag liya","mujhe scam kar liya","fraud ho gaya mujhse",
      "galti se click","link par click kar diya","link pe click kar diya","click kar diya aur","unknown link par click",
      "galti se link pe click","link open kar diya",
    ];

    const msgLower = userMsg.toLowerCase();
    const botTextLower = botText.toLowerCase();
    const isDanger = dangerKeywords.some((kw) => msgLower.includes(kw));
    const botMentionedHelpline = botTextLower.includes("1930") || botTextLower.includes("cybercrime.gov.in");
    if ((isDanger || botMentionedHelpline) && !complaintDismissed) setShowComplaintPrompt(true);
  };

  const currentLang = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  const suggestions = [
    "What is phishing?",
    "UPI scam se kaise bachein?",
    "I clicked a suspicious link, what should I do?",
    "KYC scam kya hota hai?",
    "How do I report a scam in India?",
  ];

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#030712] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.16),transparent_26%),radial-gradient(circle_at_80%_75%,rgba(139,92,246,0.16),transparent_28%),linear-gradient(135deg,#030712_0%,#081126_45%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Header */}
      <div className="relative z-20 border-b border-white/10 bg-[#030712]/70 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Aivionix Assistant 🤖</h1>
            <p className="mt-1 text-xs text-slate-400">Scam detection, safety guidance, and emergency support</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="relative" ref={langRef}>
              <button onClick={() => setShowLangMenu((v) => !v)} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-slate-300 transition hover:bg-white/[0.08]">
                <span>{currentLang.flag}</span><span>{currentLang.label}</span><span className="text-slate-500">▾</span>
              </button>
              {showLangMenu && (
                <div className="absolute right-0 top-11 z-50 min-w-[180px] rounded-2xl border border-white/10 bg-[#081126] p-2 shadow-2xl">
                  {LANGUAGES.map((lang) => (
                    <button key={lang.code} onClick={() => { setSelectedLang(lang.code); setShowLangMenu(false); }}
                      className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs transition hover:bg-white/10 ${selectedLang === lang.code ? "text-violet-300" : "text-slate-300"}`}>
                      <span>{lang.flag}</span><span>{lang.label}</span>
                      {selectedLang === lang.code && <span className="ml-auto text-violet-300">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => navigate("/history")} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-slate-300 transition hover:bg-white/[0.08]">📋 History</button>
            <span className={`rounded-2xl border px-4 py-2 text-xs font-medium ${modelActive ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-300" : "border-yellow-500/30 bg-yellow-500/15 text-yellow-300"}`}>
              {modelActive ? "● ML active" : "● Rules only"}
            </span>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-5xl space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`w-fit max-w-[78%] ${msg.sender === "user" ? "ml-auto" : "mr-auto"}`}>

                {msg.sender === "bot" && !msg.isDefault && (
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <ModeBadge mode={msg.mode} />
                    <MLBadge label={msg.mlLabel} />
                    <LangBadge lang={msg.detectedLang} />
                  </div>
                )}

                {/* Image preview in chat bubble */}
                {msg.imagePreview && (
                  <div className="mb-2">
                    <img src={msg.imagePreview} alt="uploaded screenshot"
                      className="max-w-full rounded-2xl border border-white/20 max-h-52 object-cover shadow-lg" />
                  </div>
                )}

                <div className={`rounded-[28px] px-5 py-4 text-sm leading-7 shadow-lg whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-indigo-500/20"
                    : msg.isDefault
                    ? "border border-white/10 bg-white/[0.05] text-slate-200 backdrop-blur-xl"
                    : "border border-white/10 bg-[#111827]/80 text-slate-200 backdrop-blur-xl"
                }`}>
                  {msg.text}
                </div>

                {msg.sender === "bot" && !msg.isDefault && msg.risk !== null && msg.risk !== undefined && <RiskBar value={msg.risk} />}
                {msg.sender === "bot" && !msg.isDefault && msg.mlScore !== null && msg.mlScore !== undefined && <ScoreBreakdown mlScore={msg.mlScore} ruleScore={msg.ruleScore} />}
              </div>
            </div>
          ))}

          {showComplaintPrompt && <ComplaintPromptCard />}

          {/* Text loading */}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sm text-slate-400 backdrop-blur-xl">
                <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 delay-100" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 delay-200" />
                <span className="ml-2">Thinking...</span>
              </div>
            </div>
          )}

          {/* Image loading */}
          {imageLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl border border-purple-500/20 bg-purple-500/10 px-5 py-4 text-sm text-purple-300 backdrop-blur-xl">
                <span className="text-lg">📸</span>
                <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 delay-100" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 delay-200" />
                <span className="ml-2">Screenshot analyze ho raha hai...</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && !loading && (
        <div className="relative z-20 border-t border-white/10 bg-[#030712]/70 px-6 py-4 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => setInput(s)}
                className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-slate-300 transition hover:border-violet-400/30 hover:bg-violet-500/15 hover:text-white">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image preview bar — appears above input when image selected */}
      {imagePreview && (
        <div className="relative z-20 border-t border-white/10 bg-[#030712]/80 px-6 pt-4 pb-0 backdrop-blur-xl">
          <div className="mx-auto max-w-5xl flex items-center gap-4">
            <div className="relative inline-block">
              <img src={imagePreview} alt="preview"
                className="h-20 w-auto rounded-2xl border border-white/20 object-cover shadow-lg" />
              <button onClick={() => { setImagePreview(null); setImageFile(null); }}
                className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs hover:bg-red-600 shadow-lg">
                ✕
              </button>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-2">Screenshot ready to analyze</p>
              <button onClick={handleImageSend} disabled={imageLoading}
                className="rounded-2xl bg-gradient-to-r from-purple-500 to-violet-500 px-5 py-2.5 text-xs font-semibold text-white transition hover:scale-[1.02] disabled:opacity-50 shadow-lg">
                {imageLoading ? "Analyzing..." : "📸 Analyze Screenshot"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleImageSelect} className="hidden" />

      {/* Input bar */}
      <div className="relative z-20 border-t border-white/10 bg-[#030712]/80 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl gap-3 rounded-[28px] border border-white/10 bg-white/[0.05] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

          {/* Screenshot upload button */}
          <button onClick={() => fileInputRef.current?.click()} disabled={loading || imageLoading}
            title="Upload screenshot to analyze"
            className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-slate-300 transition hover:border-purple-400/30 hover:bg-purple-500/15 hover:text-purple-300 disabled:opacity-50 text-base">
            📸
          </button>

          <input type="text" value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && !imageLoading && handleSend()}
            placeholder="Type message or 📸 upload screenshot..."
            className="flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500"
          />

          <button onClick={handleSend} disabled={loading || imageLoading}
            className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}