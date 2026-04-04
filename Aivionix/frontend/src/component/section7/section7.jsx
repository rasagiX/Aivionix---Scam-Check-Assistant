import React from "react";
import Left from "./left";
import Right from "./right";


export default function Section7() {
  return (
    <section className="relative w-full bg-gradient-to-br from-slate-950 via-indigo-950 to-black py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">
        <Left/>
        <Right/>
      </div>
    </section>
  );
}