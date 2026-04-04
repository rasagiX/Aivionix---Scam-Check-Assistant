import React from "react";
import { ShieldAlert, Lock, AlertTriangle, Radar, Shield } from "lucide-react";

export default function Left() {
  return (
    <div className="flex">
      <div className="relative w-full aspect-square bg-gradient-to-br from-[#111827] to-[#1f2937] rounded-3xl p-12 shadow-2xl border border-purple-500/20 flex items-center justify-center overflow-hidden">
        
        {/* Glow Background */}
        <div className="absolute inset-0 bg-purple-600/10 blur-3xl"></div>

        {/* CENTER SHIELD */}
        <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-purple-500/40">
          <ShieldAlert className="text-white w-14 h-14" />
        </div>

        {/* ORBIT WRAPPER */}
        <div className="absolute inset-0 flex items-center justify-center orbit">
          
          <div className="relative w-[75%] h-[75%]">
            
            {/* Top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <Lock className="w-8 h-8 text-purple-400 counter-orbit" />
            </div>

            {/* Right */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2">
              <AlertTriangle className="w-8 h-8 text-red-500 counter-orbit" />
            </div>

            {/* Bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <Radar className="w-8 h-8 text-indigo-400 counter-orbit" />
            </div>

            {/* Left */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2">
              <Shield className="w-8 h-8 text-purple-500 counter-orbit opacity-80" />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}