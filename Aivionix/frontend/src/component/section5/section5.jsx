import React from "react";
import Card from "./card";

const Section5 = () => {
  const handleReportRedirect = () => {
    const confirmed = window.confirm(
      "If you have already clicked a suspicious link, shared details, or lost money, you can continue to the official cybercrime reporting portal.\n\nDo you want to report this incident now?"
    );

    if (confirmed) {
      window.open("https://cybercrime.gov.in", "_blank", "noopener,noreferrer");
    }
  };

  const features = [
    {
      id: "01",
      title: "Bank & KYC Alerts",
      description:
        "Detects fake “update KYC” and “account blocked” messages asking for links, OTPs or personal details."
    },
    {
      id: "02",
      title: "UPI / OTP Requests",
      description:
        "Flags texts that push you to share UPI PIN, ATM OTP, or one-time passwords in a hurry."
    },
    {
      id: "03",
      title: "Job & Task Offers",
      description:
        "Spots messages promising easy work-from-home money, registration fees or Telegram task scams."
    },
    {
      id: "04",
      title: "Lottery & Prize Messages",
      description:
        "Catches fake lottery wins, random rewards, and “you have won a car” style texts."
    },
    {
      id: "05",
      title: "Shopping & Delivery Links",
      description:
        "Highlights suspicious order, refund or courier messages that send you to unknown payment pages."
    },
    {
      id: "06",
      title: "Phishing Emails & Links",
      description:
        "Warns when messages try to imitate banks, support teams or brands with look-alike links and email IDs."
    },
    {
      id: "07",
      title: "Report & Recover Support",
      description:
        "If you have already clicked a scam link or lost money, the app can quickly guide you to the official cybercrime portal so you can report the incident without delay.",
      action: handleReportRedirect,
      actionLabel: "Report Incident"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[#040714] py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,241,0.18),transparent_24%),radial-gradient(circle_at_20%_75%,rgba(168,85,247,0.12),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.08),transparent_22%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center text-white">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
          Core Detection Coverage
        </div>

        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          General Features
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
          Our checker understands the most common scam patterns people face every day
          and gives clear, practical guidance before things get worse.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.id}
              id={feature.id}
              title={feature.title}
              description={feature.description}
              action={feature.action}
              actionLabel={feature.actionLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section5;