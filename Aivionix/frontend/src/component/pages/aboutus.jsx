import React from "react";
import Navbar from "../section1/navbar";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  BrainCircuit,
  Users,
  SearchCheck,
  HelpCircle,
  Mail,
  MessageCircleWarning,
  Link2,
  AlertTriangle,
} from "lucide-react";

export default function About() {
  const riskSteps = [
    {
      icon: <MessageCircleWarning className="h-6 w-6 text-rose-300" />,
      title: "Message Pattern Scan",
      text: "We check if the message uses urgency, fear, rewards, KYC pressure, or money-related tricks.",
    },
    {
      icon: <Link2 className="h-6 w-6 text-cyan-300" />,
      title: "Suspicious Link Check",
      text: "We look for unknown, shortened, or look-alike links that may imitate banks, shops, or support teams.",
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-amber-300" />,
      title: "Risk Explanation",
      text: "We explain why the message may be unsafe in simple language so users know what to avoid.",
    },
  ];

  const faqs = [
    {
      q: "Is Aivionix an official government app?",
      a: "No. Aivionix is a safety assistant project. For official cybercrime reporting, users should use the official cybercrime portal.",
    },
    {
      q: "Can I check WhatsApp and SMS messages?",
      a: "Yes. The app is designed to help users check suspicious SMS, WhatsApp messages, emails, and links.",
    },
    {
      q: "What happens if I already clicked a scam link?",
      a: "The app can guide you toward the official cybercrime reporting portal so you can take the next step quickly.",
    },
  ];

  return (
    <main className="relative overflow-hidden bg-[#030712] text-white">
      <Navbar/>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(59,130,246,0.08),transparent_24%),radial-gradient(circle_at_82%_75%,rgba(139,92,246,0.12),transparent_24%),linear-gradient(135deg,#030712_0%,#081126_42%,#020617_100%)]" />

      {/* OUR MISSION */}
      <section id="our-mission" className="relative min-h-screen overflow-hidden px-6 py-20">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/80 backdrop-blur-md transition hover:bg-white/[0.08]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="grid min-h-[75vh] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
                Our Mission
              </div>

              <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
                Making Digital
                <br />
                <span className="text-violet-300">Safety Simple</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-300">
                Aivionix is built to help everyday users understand risky
                messages before they click, reply, pay, or share personal
                details. Our mission is simple: make scam detection easy enough
                for everyone.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/chat"
                  className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-4 font-semibold text-white shadow-[0_12px_30px_rgba(99,102,241,0.28)] transition hover:scale-[1.03]"
                >
                  Try Checker
                </Link>

                <a
                  href="#how-we-detect-risk"
                  className="rounded-2xl border border-white/12 bg-white/[0.04] px-7 py-4 font-semibold text-white/90 backdrop-blur-md transition hover:bg-white/[0.08]"
                >
                  See How It Works
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-3xl" />

              <div className="relative rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <div className="grid gap-5">
                  <MissionCard
                    icon={<ShieldCheck className="h-6 w-6 text-cyan-300" />}
                    title="Protect Everyday Users"
                    text="Help people recognize suspicious messages before damage happens."
                  />
                  <MissionCard
                    icon={<BrainCircuit className="h-6 w-6 text-violet-300" />}
                    title="Explain Risk Clearly"
                    text="No confusing jargon. Just simple safe-or-risky guidance."
                  />
                  <MissionCard
                    icon={<Users className="h-6 w-6 text-emerald-300" />}
                    title="Built for Everyone"
                    text="Useful for families, students, elderly users, and first-time smartphone users."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE DETECT RISK */}
      <section id="how-we-detect-risk" className="relative min-h-screen px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
              <SearchCheck className="h-4 w-4 text-violet-300" />
              How We Detect Risk
            </div>

            <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
              We Look for Scam Signals,
              <br />
              <span className="text-violet-300">Not Just Keywords</span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A suspicious message is usually a mix of urgency, fake authority,
              risky links, and pressure. Aivionix checks these signals together
              and explains the result clearly.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {riskSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/[0.06]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06]">
                    {step.icon}
                  </div>
                  <span className="text-sm text-white/35">0{index + 1}</span>
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-300">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[36px] border border-white/10 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 p-8 backdrop-blur-xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/45">
              Final Output
            </p>
            <h3 className="mt-3 text-3xl font-semibold">
              A simple result users can act on.
            </h3>
            <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300">
              Instead of overwhelming the user, Aivionix gives a clear risk
              level, explains the reason, and suggests the safest next step.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative min-h-screen px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
              <HelpCircle className="h-4 w-4 text-violet-300" />
              FAQ
            </div>

            <h2 className="text-4xl font-bold md:text-6xl">
              Questions Users May Ask
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Clear answers for common doubts about scam checking, reporting,
              and safety guidance.
            </p>
          </div>

          <div className="space-y-5">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
              >
                <h3 className="text-xl font-semibold text-white">{item.q}</h3>
                <p className="mt-3 text-base leading-8 text-slate-300">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative min-h-screen px-6 py-24">
        <div className="mx-auto grid max-w-7xl min-h-[70vh] items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
              <Mail className="h-4 w-4 text-violet-300" />
              Contact
            </div>

            <h2 className="text-4xl font-bold leading-tight md:text-6xl">
              Want to Improve
              <br />
              <span className="text-violet-300">Aivionix?</span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Share feedback, suggest scam patterns, or tell us what feature
              would help users stay safer online.
            </p>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-violet-400/40"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-violet-400/40"
              />
              <textarea
                placeholder="Your message"
                rows="5"
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-violet-400/40"
              ></textarea>
              <button className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-7 py-4 font-semibold text-white shadow-[0_12px_30px_rgba(99,102,241,0.28)] transition hover:scale-[1.02]">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MissionCard({ icon, title, text }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
    </div>
  );
}