import React from "react";
import Left from "./left";
import Right from "./right";

export default function Section7() {
  return (
    <section className="relative w-full overflow-hidden bg-[#030712] py-28 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(59,130,246,0.08),transparent_24%),radial-gradient(circle_at_78%_70%,rgba(139,92,246,0.12),transparent_28%),linear-gradient(135deg,#030712_0%,#081126_42%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
          <Left />
          <Right />
        </div>
      </div>
    </section>
  );
}