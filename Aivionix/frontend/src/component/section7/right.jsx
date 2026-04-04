import React from "react";

export default function Right() {
  return (
    <div className="flex flex-col justify-center text-white">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        AI‑Powered Message Risk Detection
      </h2>

      <h4 className="text-purple-400 font-semibold mb-4">
       Stay Protected in Real Time
      </h4>

      <p className="text-gray-300 leading-relaxed mb-8">
        Our checker analyzes your SMS, WhatsApp chats, emails and links for common scam patterns, urgent money requests and fake login pages—so you spot danger before you click.
      </p>

      <ul className="space-y-4 mb-8">
        <li className="flex items-center gap-3">
          <span className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-xs">✓</span>
          Instant risk score for every message
        </li>
        <li className="flex items-center gap-3">
          <span className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-xs">✓</span>
          Clear reasons and guidance in simple language
        </li>
        <li className="flex items-center gap-3">
          <span className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-xs">✓</span>
          Continuously improving checks with new scam patterns
        </li>
      </ul>

      <button className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/40 w-fit">
        Start Now →
      </button>
    </div>
  );
}