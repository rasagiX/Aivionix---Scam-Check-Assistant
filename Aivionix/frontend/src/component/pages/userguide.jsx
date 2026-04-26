import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../section1/navbar";
import {
  ArrowLeft,
  MessageSquareText,
  Upload,
  ShieldAlert,
  ExternalLink,
} from "lucide-react";

export default function UserGuide() {
  const steps = [
    {
      icon: <MessageSquareText className="h-6 w-6 text-cyan-300" />,
      title: "Paste or type a message",
      text: "Copy any suspicious SMS, WhatsApp message, email, or link and paste it into the checker.",
      image: "/images/guide-message.png",
    },
    {
      icon: <Upload className="h-6 w-6 text-violet-300" />,
      title: "Upload screenshot",
      text: "You can also upload a screenshot of a suspicious message if typing feels difficult.",
      image: "/images/guide-upload.png",
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-rose-300" />,
      title: "Read the risk result",
      text: "Aivionix shows whether the message looks safe, risky, or needs urgent action.",
      image: "/images/guide-result.png",
    },
    {
      icon: <ExternalLink className="h-6 w-6 text-emerald-300" />,
      title: "Report if needed",
      text: "If money is lost or personal details were shared, continue to the official cybercrime portal.",
      image: "/images/guide-report.png",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] px-6 py-20 text-white">
      <Navbar/>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(59,130,246,0.08),transparent_24%),radial-gradient(circle_at_82%_75%,rgba(139,92,246,0.12),transparent_24%),linear-gradient(135deg,#030712_0%,#081126_42%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/80 backdrop-blur-md transition hover:bg-white/[0.08]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <section className="text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
            User Guide
          </div>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            How to Use
            <br />
            <span className="text-violet-300">Aivionix Safely</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Follow these simple steps to check suspicious messages, understand
            risk, and take the right action if something feels unsafe.
          </p>
        </section>

        <section className="mt-20 space-y-10">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="grid gap-8 rounded-[36px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:grid-cols-[0.9fr_1.1fr] md:p-8"
            >
              <div className="flex flex-col justify-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06]">
                  {step.icon}
                </div>

                <p className="mb-3 text-sm text-white/40">
                  Step {String(index + 1).padStart(2, "0")}
                </p>

                <h2 className="text-3xl font-semibold text-white">
                  {step.title}
                </h2>

                <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
                  {step.text}
                </p>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#061024]/80">
                <img
                  src={step.image}
                  alt={step.title}
                  className="h-72 w-full object-cover opacity-90"
                />
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-[36px] border border-white/10 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 p-8 text-center backdrop-blur-xl">
          <h2 className="text-3xl font-semibold">Need urgent help?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">
            If you already clicked a scam link, shared details, or lost money,
            report the incident through the official cybercrime portal.
          </p>

          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-4 font-semibold text-white shadow-[0_12px_30px_rgba(99,102,241,0.28)] transition hover:scale-[1.03]"
          >
            Report Cybercrime
          </a>
        </section>
      </div>
    </main>
  );
}