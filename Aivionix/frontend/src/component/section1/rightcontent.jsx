import React from "react";
import { Canvas } from "@react-three/fiber";
import Robot from "./robot";

const RightContent = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="relative h-[500px] w-full max-w-[520px] -translate-y-6 translate-x-6">
        <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
        <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/15" />

        <div className="absolute inset-x-4 top-6 rounded-[28px] border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl shadow-[0_0_50px_rgba(76,29,149,0.25)]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <p className="text-sm font-medium text-white/90">AI Assistant Online</p>
              <p className="text-xs text-white/45">Scanning messages in real time</p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live
            </div>
          </div>

          <div className="absolute left-4 top-24 rounded-lg border border-white/10 bg-[#0b1127]/80 px-3 py-1 text-xs text-white/70">
            SMS Check
          </div>

          <div className="absolute right-4 top-28 rounded-lg border border-white/10 bg-[#0b1127]/80 px-3 py-1 text-xs text-white/70">
            Link Scan
          </div>

          <div className="relative h-[360px] w-full">
            <Canvas camera={{ position: [0, 0, 9], fov: 34 }}>
              <Robot />
            </Canvas>
          </div>

          <div className="mx-4 mb-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2">
            <p className="text-xs text-white/70">Instant Risk Analysis</p>
            <span className="text-xs text-violet-300">AI Powered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightContent;