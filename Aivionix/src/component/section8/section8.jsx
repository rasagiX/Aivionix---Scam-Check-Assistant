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

              <button className="bg-purple-600 hover:bg-purple-700 transition px-6 py-2 rounded-full text-sm text-white mb-8">
                Start Now →
              </button>

              <div>
                <p className="text-gray-500 text-sm mb-3">Social Media</p>
                <div className="flex gap-4 text-gray-400">
                  <Youtube size={18} />
                  <Facebook size={18} />
                  <Instagram size={18} />
                  <Twitter size={18} />
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-white font-medium mb-4">Home</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Overview</li>
                <li>How it works</li>
                <li>Message Checker</li>
                <li>Safety tips</li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-white font-medium mb-4">About us</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Our mission</li>
                <li>How Aivionix decides risk</li>
                <li>FAQ</li>
                <li>Contact</li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="text-white font-medium mb-4">User guide</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>How to use the checker</li>
                <li>What our risk levels mean</li>
                <li>Reporting a missed scam</li>
                <li>Privacy & data use</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}