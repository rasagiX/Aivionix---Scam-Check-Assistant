import React from "react";
import Left from "./left";
import Right from "./right";


export default function Section7() {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#0b0f1a] via-[#111827] to-[#1e1b4b] py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">
        <Left/>
        <Right/>
      </div>
    </section>
  );
}