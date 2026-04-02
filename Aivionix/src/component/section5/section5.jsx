import React from "react";
import Card from "./card";

const Section5 = () => {
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
        "Flags texts that push you to share UPI PIN, ATM OTP, or one‑time passwords in a hurry."
    },
    {
      id: "03",
      title: "Job & Task Offers",
      description:
        "Spots messages promising easy work‑from‑home money, registration fees or Telegram task scams."
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
        "Warns when messages try to imitate banks, support teams or brands with look‑alike links and email IDs."
    }
  ];

  return (
    <section className="relative py-28 bg-gradient-to-br from-slate-950 via-indigo-950 to-black overflow-hidden">

      {/* Purple Glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-purple-600 opacity-30 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          General Features
        </h2>

        <p className="max-w-2xl mx-auto text-gray-300 mb-16">
          Our checker understands different kinds of tricky messages you see every day.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.id}
              id={feature.id}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Section5;