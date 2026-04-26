import React from "react";
import { ShieldCheck, Link2, BellRing, Wallet, Mail, Smartphone } from "lucide-react";

const miniCards = [
  {
    icon: <Link2 className="h-5 w-5 text-cyan-300" />,
    title: "Link Scan",
    text: "Detects suspicious redirects",
    className: "top-2 left-8",
  },
  {
    icon: <Wallet className="h-5 w-5 text-amber-300" />,
    title: "Money Risk",
    text: "Flags urgent payment tricks",
    className: "top-10 right-2",
  },
  {
    icon: <Mail className="h-5 w-5 text-violet-300" />,
    title: "Phishing Check",
    text: "Spots fake brand impersonation",
    className: "bottom-24 left-0",
  },
  {
    icon: <BellRing className="h-5 w-5 text-rose-300" />,
    title: "Alert Signals",
    text: "Finds pressure-based language",
    className: "bottom-8 right-8",
  },
  {
    icon: <Smartphone className="h-5 w-5 text-indigo-300" />,
    title: "SMS Review",
    text: "Reads common mobile scam patterns",
    className: "left-1/2 bottom-0 -translate-x-1/2",
  },
];

export default function Left() {
  return (
    <div className="relative mx-auto flex h-[560px] w-full max-w-[560px] items-center justify-center">
      <div className="absolute h-[360px] w-[360px] rounded-full bg-violet-500/15 blur-3xl" />
      <div className="absolute h-[240px] w-[240px] rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="absolute h-[420px] w-[420px] rounded-full border border-white/10" />
      <div className="absolute h-[310px] w-[310px] rounded-full border border-violet-400/10" />
      <div className="absolute h-[220px] w-[220px] rounded-full border border-cyan-300/10" />

      <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[0_0_60px_rgba(139,92,246,0.35)]">
        <div className="absolute inset-[10px] rounded-full border border-white/15 bg-black/10 backdrop-blur-md" />
        <ShieldCheck className="relative z-10 h-14 w-14 text-white" />
      </div>

      {miniCards.map((card) => (
        <div
          key={card.title}
          className={`absolute w-[180px] rounded-[24px] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.25)] ${card.className}`}
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.06]">
            {card.icon}
          </div>
          <h4 className="text-sm font-semibold text-white/90">{card.title}</h4>
          <p className="mt-2 text-xs leading-6 text-white/60">{card.text}</p>
        </div>
      ))}
    </div>
  );
}