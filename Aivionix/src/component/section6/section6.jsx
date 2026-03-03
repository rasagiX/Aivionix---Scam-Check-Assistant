import React from "react";

const Section6 = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-black">

      {/* Background Glow */}
      <div className="absolute inset-0 flex justify-center items-end pointer-events-none">
        <div className="w-[900px] h-[400px] bg-indigo-600 opacity-40 blur-[180px]" />
      </div>

      {/* Main Glass Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div
          className=" relative rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 px-10 py-20 text-center shadow-[0_40px_120px_rgba(88,80,255,0.35)]"
        >
          {/* Top Grid */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[120px] opacity-30">
            <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:60px_40px]" />
          </div>

          {/* Bottom Grid */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[180px] opacity-20">
            <div className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_top,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:60px_40px]" />
          </div>

          {/* Content */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Early Access
          </h2>

          <p className="text-gray-300 max-w-xl mx-auto mb-10 text-sm md:text-base">
            Be the first to try our message‑risk checker and help us make it safer for everyone.
          </p>

          {/* Input */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className=" mx-auto flex max-w-md items-center gap-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/10  p-2 "
          >
            <input
              type="email" required placeholder="Enter your email"  className=" flex-1 bg-transparent px-4  py-3 text-sm text-white  placeholder:text-white/40 focus:outline-none "
            />

            <button
              type="submit" className=" rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Notify Me
            </button>
          </form>

          {/* Footer text */}
          <p className="mt-6 text-xs text-white/40">
           No spam. Just early access invites and important safety updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Section6;