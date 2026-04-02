import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from "lucide-react";

export default function Section8() {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#070b1a] via-[#0f172a] to-[#2a0f3f] py-24 px-6">
      
      <div className="max-w-7xl mx-auto">

        {/* Glass Footer Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-16 shadow-2xl shadow-purple-900/40">

          <div className="grid md:grid-cols-4 gap-12">

            {/* Column 1 - Brand */}
            <div>
              <h2 className="text-white text-xl font-semibold mb-4">
                Aivionix
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Aivionix helps you quickly spot risky SMS, WhatsApp messages, emails and links, so your digital life stays safe without slowing you down.
              </p>

              <button 
                type="button"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 px-6 py-3 rounded-full text-sm font-medium text-white mb-8 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Start Now →
              </button>

              <div>
                <p className="text-gray-500 text-sm mb-3">Follow us</p>
                <div className="flex gap-3">
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="p-2 rounded-lg hover:bg-white/10 hover:text-purple-400 transition-all duration-300">
                    <Youtube size={20} />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-lg hover:bg-white/10 hover:text-blue-400 transition-all duration-300">
                    <Facebook size={20} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-lg hover:bg-white/10 hover:text-pink-400 transition-all duration-300">
                    <Instagram size={20} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-2 rounded-lg hover:bg-white/10 hover:text-sky-400 transition-all duration-300">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <nav role="navigation" aria-label="Main menu">
              <h3 className="text-white font-medium mb-6">Home</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#overview" className="hover:text-white transition-colors duration-300 block py-1 hover:pl-2 border-l-2 border-transparent hover:border-purple-400">Overview</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors duration-300 block py-1 hover:pl-2 border-l-2 border-transparent hover:border-purple-400">How it works</a></li>
                <li><a href="#checker" className="hover:text-white transition-colors duration-300 block py-1 hover:pl-2 border-l-2 border-transparent hover:border-purple-400">Message Checker</a></li>
                <li><a href="#tips" className="hover:text-white transition-colors duration-300 block py-1 hover:pl-2 border-l-2 border-transparent hover:border-purple-400">Safety tips</a></li>
              </ul>
            </nav>

            {/* Column 3 */}
            <nav role="navigation" aria-label="About navigation">
              <h3 className="text-white font-medium mb-6">About us</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#mission" className="hover:text-white transition-colors duration-300 block py-1 hover:pl-2 border-l-2 border-transparent hover:border-purple-400">Our mission</a></li>
                <li><a href="#risk-analysis" className="hover:text-white transition-colors duration-300 block py-1 hover:pl-2 border-l-2 border-transparent hover:border-purple-400">How we detect risk</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors duration-300 block py-1 hover:pl-2 border-l-2 border-transparent hover:border-purple-400">FAQ</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors duration-300 block py-1 hover:pl-2 border-l-2 border-transparent hover:border-purple-400">Contact</a></li>
              </ul>
            </nav>

            {/* Column 4 */}
            <nav role="navigation" aria-label="User guide">
              <h3 className="text-white font-medium mb-6">User guide</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#guide" className="hover:text-white transition-colors duration-300 block py-1 hover:pl-2 border-l-2 border-transparent hover:border-purple-400">How to use checker</a></li>
                <li><a href="#risk-levels" className="hover:text-white transition-colors duration-300 block py-1 hover:pl-2 border-l-2 border-transparent hover:border-purple-400">Risk levels explained</a></li>
                <li><a href="#report" className="hover:text-white transition-colors duration-300 block py-1 hover:pl-2 border-l-2 border-transparent hover:border-purple-400">Report false negative</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors duration-300 block py-1 hover:pl-2 border-l-2 border-transparent hover:border-purple-400">Privacy policy</a></li>
              </ul>
            </nav>

          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-12 mt-16 text-center">
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
              &copy; 2024 <span className="font-semibold text-white">Aivionix</span>. All rights reserved. |
              <a href="#privacy" className="hover:text-purple-400 underline transition-colors ml-1">Privacy Policy</a> |
              <a href="#terms" className="hover:text-purple-400 underline transition-colors ml-1">Terms of Service</a>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
