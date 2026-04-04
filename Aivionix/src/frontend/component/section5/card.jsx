import React from "react";

const Card = ({ id, title, description }) => {
  return (
    <div
      className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-left transition-all duration-500 hover:-translate-y-3 hover:bg-purple-600/20 hover:shadow-[0_20px_60px_rgba(123,45,255,0.5)] group"
    >
      {/* Arrow */}
      <div className="absolute top-6 right-6 text-xl text-white/40 group-hover:text-white transition">
        ↗
      </div>

      {/* Number */}
      <span className="text-sm text-white/50">
        {id}.
      </span>

      {/* Title */}
      <h4 className="mt-6 mb-4 text-xl font-semibold text-white">
        {title}
      </h4>

      {/* Description */}
      <p className="text-sm text-white/60 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default Card;