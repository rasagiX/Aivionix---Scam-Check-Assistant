import React from "react";

const points = [
  "Checks messages across SMS, chats, links, and emails",
  "Highlights risk in simple words before users act",
  "Helps people understand why a message feels unsafe",
];

const stats = [
  { value: "SMS", label: "message type" },
  { value: "Links", label: "URL review" },
  { value: "Email", label: "phishing check" },
];

export default function Right() {
  return (
    <div className="text-white">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
        Protection Layers
      </div>

      <h2 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
        Multiple Signals,
        <br />
        One Safer Decision
      </h2>

      <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
        Our checker does not rely on one clue alone. It looks at links, urgency,
        sender patterns, payment requests, and language signals together to give
        a clearer safety decision.
      </p>

      <div className="mt-8 space-y-4">
        {points.map((point) => (
          <div
            key={point}
            className="flex items-start gap-4 rounded-[20px] border border-white/10 bg-white/[0.035] px-4 py-4 backdrop-blur-md"
          >
            <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white shadow-[0_0_18px_rgba(99,102,241,0.28)]">
              ✓
            </span>
            <span className="text-base leading-7 text-slate-200">{point}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4">
        {stats.map((item) => (
          <div
            key={item.value}
            className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-5 text-center backdrop-blur-md"
          >
            <p className="text-xl font-semibold text-white/90">{item.value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/45">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <button className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-4 font-semibold text-white shadow-[0_12px_30px_rgba(99,102,241,0.35)] transition duration-300 hover:scale-[1.03] hover:from-indigo-400 hover:to-violet-400">
          Start Now →
        </button>

        <button className="rounded-2xl border border-white/12 bg-white/[0.04] px-7 py-4 font-semibold text-white/90 backdrop-blur-md transition duration-300 hover:bg-white/[0.08]">
          Learn More
        </button>
      </div>
    </div>
  );
}