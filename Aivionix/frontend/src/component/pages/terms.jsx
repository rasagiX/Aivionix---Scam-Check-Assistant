import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../section1/navbar";
import { ArrowLeft, FileText, ShieldCheck, AlertTriangle } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      title: "1. Purpose of Aivionix",
      text: "Aivionix is designed to help users understand suspicious messages, links, emails, and scam patterns. It provides guidance and risk signals, but it does not guarantee complete protection from fraud.",
    },
    {
      title: "2. Not Official Legal or Government Advice",
      text: "Aivionix is not a government service, police authority, bank, or legal advisor. Any serious cybercrime incident should be reported through official channels such as cybercrime.gov.in.",
    },
    {
      title: "3. User Responsibility",
      text: "Users are responsible for their own actions after viewing results. Do not share OTPs, passwords, banking details, or personal information with unknown sources.",
    },
    {
      title: "4. Accuracy of Results",
      text: "The app tries to identify risky patterns, but results may not always be perfect. Some scam messages may be missed, and some safe messages may be flagged as risky.",
    },
    {
      title: "5. Privacy and Data",
      text: "Users should avoid uploading highly sensitive personal information unless necessary. Future versions may include stronger privacy controls and storage policies.",
    },
    {
      title: "6. External Links",
      text: "Aivionix may redirect users to external websites such as the official cybercrime reporting portal. We are not responsible for the content or operation of external websites.",
    },
    {
      title: "7. Changes to Terms",
      text: "These terms may be updated as the app improves. Continued use of the app means users accept the latest version of these terms.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] px-6 py-20 text-white">
      <Navbar/>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(59,130,246,0.08),transparent_24%),radial-gradient(circle_at_82%_75%,rgba(139,92,246,0.12),transparent_24%),linear-gradient(135deg,#030712_0%,#081126_42%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/80 backdrop-blur-md transition hover:bg-white/[0.08]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <section className="rounded-[36px] border border-white/10 bg-[#061024]/80 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-12">
          <div className="mb-12 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              <FileText className="h-4 w-4 text-violet-300" />
              Terms & Conditions
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Terms of Use
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300">
              Please read these terms carefully before using Aivionix. This page
              explains the basic rules, limitations, and responsibilities.
            </p>
          </div>

          <div className="mb-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <ShieldCheck className="mb-4 h-6 w-6 text-emerald-300" />
              <h2 className="text-xl font-semibold">Safety Assistant</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Aivionix helps users spot suspicious messages, but users should
                still verify important information from trusted sources.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <AlertTriangle className="mb-4 h-6 w-6 text-amber-300" />
              <h2 className="text-xl font-semibold">Important Notice</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                In case of financial loss or cybercrime, use official reporting
                channels immediately.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {sections.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6"
              >
                <h2 className="text-xl font-semibold text-white">
                  {item.title}
                </h2>
                <p className="mt-3 leading-8 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] border border-white/10 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 p-6">
            <h2 className="text-2xl font-semibold">Emergency Reporting</h2>
            <p className="mt-3 leading-8 text-slate-300">
              If you believe you are a victim of cybercrime, visit the official
              cybercrime reporting portal.
            </p>

            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3.5 font-semibold text-white transition hover:scale-[1.03]"
            >
              Go to Cybercrime Portal
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}