import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
} from "lucide-react";

export default function Section8() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    navigate("/");

    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const footerLinks = [
    {
      title: "Home",
      links: [
        { label: "Overview", id: "overview" },
        { label: "How it works", id: "how-it-works" },
        { label: "Message Checker", id: "message-checker" },
        { label: "Safety Tips", id: "safety-tips" },
      ],
    },
    {
      title: "About us",
      links: [
        { label: "Our mission", path: "/about" },
        { label: "How we detect risk", path: "/about" },
        { label: "FAQ", path: "/about" },
        { label: "Contact", path: "/about" },
      ],
    },
    {
      title: "User guide",
      links: [
        { label: "How to use checker", path: "/userguide" },
        { label: "Risk levels explained", path: "/userguide" },
        { label: "Report false negative", path: "/userguide" },
        { label: "Privacy policy", path: "/terms" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Youtube, label: "YouTube" },
    { icon: Facebook, label: "Facebook" },
    { icon: Instagram, label: "Instagram" },
    { icon: Twitter, label: "Twitter" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#030712] px-6 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_24%),radial-gradient(circle_at_80%_75%,rgba(139,92,246,0.12),transparent_24%),linear-gradient(135deg,#030712_0%,#081126_42%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 mx-auto max-w-7xl rounded-[32px] border border-white/10 bg-[#061024]/80 p-10 shadow-[0_20px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                A
              </div>
              <h2 className="text-2xl font-semibold">Aivionix</h2>
            </div>

            <p className="max-w-sm leading-relaxed text-white/70">
              Aivionix helps you quickly spot risky SMS, WhatsApp messages,
              emails, and links — so your digital life stays safer without
              slowing you down.
            </p>

            <Link to="/chat">
              <button className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium shadow-lg shadow-purple-500/30 transition hover:scale-105">
                Start Now <ArrowRight size={16} />
              </button>
            </Link>

            <div className="mt-8">
              <p className="mb-3 text-sm text-white/50">Follow us</p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10"
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-5 text-lg font-semibold">{section.title}</h4>

              <ul className="space-y-3 text-white/70">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.id ? (
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className="text-left transition hover:text-white"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        className="transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row">
          <p>© 2024 Aivionix. All rights reserved.</p>

          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>

            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Cybercrime Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}