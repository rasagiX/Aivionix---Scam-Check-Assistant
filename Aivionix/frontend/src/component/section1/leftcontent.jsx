import { Link } from "react-router-dom";

export default function LeftContent() {
  return (
    <div className="max-w-xl">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
        AI Scam Detection Assistant
      </div>

      <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight text-white md:text-6xl">
        Protect Yourself
        <br />
        From Tricky Messages
      </h1>

      <p className="mt-6 max-w-lg text-lg leading-8 text-white/70">
        Paste any SMS, WhatsApp message, or suspicious link to get an instant
        safety check before you click, reply, or share your details.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link to="/chat">
          <button className="rounded-2xl bg-white px-7 py-4 text-base font-medium text-[#0a1024] transition duration-200 hover:scale-[1.02] hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
            Scan a Message
          </button>
        </Link>

        <button className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-medium text-white backdrop-blur-md transition duration-200 hover:scale-[1.02] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
          Learn More
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-md">
          SMS
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-md">
          WhatsApp
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-md">
          Suspicious Links
        </div>
      </div>

      <p className="mt-8 text-sm text-white/45">
        Clear answers for everyday users. No jargon. Just safe or risky.
      </p>
    </div>
  );
}